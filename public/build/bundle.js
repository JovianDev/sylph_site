
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.43.2' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/components/contributorBlock.svelte generated by Svelte v3.43.2 */

    const file$4 = "src/components/contributorBlock.svelte";

    function create_fragment$4(ctx) {
    	let div2;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let h4;
    	let t1;
    	let t2;
    	let p;
    	let t4;
    	let div1;
    	let a0;
    	let svg0;
    	let path0;
    	let t5;
    	let a1;
    	let svg1;
    	let path1;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			h4 = element("h4");
    			t1 = text(/*name*/ ctx[1]);
    			t2 = space();
    			p = element("p");
    			p.textContent = "Software Engineer";
    			t4 = space();
    			div1 = element("div");
    			a0 = element("a");
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t5 = space();
    			a1 = element("a");
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			if (!src_url_equal(img.src, img_src_value = /*devImg*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*name*/ ctx[1]);
    			attr_dev(img, "class", "svelte-hws98i");
    			add_location(img, file$4, 10, 2, 192);
    			attr_dev(div0, "class", "dev-img svelte-hws98i");
    			add_location(div0, file$4, 8, 1, 119);
    			attr_dev(h4, "class", "svelte-hws98i");
    			add_location(h4, file$4, 12, 1, 233);
    			attr_dev(p, "class", "svelte-hws98i");
    			add_location(p, file$4, 13, 1, 250);
    			attr_dev(path0, "d", "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z");
    			add_location(path0, file$4, 24, 4, 501);
    			attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg0, "width", "40");
    			attr_dev(svg0, "height", "40");
    			attr_dev(svg0, "fill", "currentColor");
    			attr_dev(svg0, "class", "bi bi-linkedin");
    			attr_dev(svg0, "viewBox", "0 0 16 16");
    			add_location(svg0, file$4, 16, 3, 342);
    			attr_dev(a0, "href", /*linkedin*/ ctx[2]);
    			attr_dev(a0, "target", "__blank");
    			attr_dev(a0, "class", "svelte-hws98i");
    			add_location(a0, file$4, 15, 2, 302);
    			attr_dev(path1, "d", "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z");
    			add_location(path1, file$4, 38, 4, 1301);
    			attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg1, "width", "40");
    			attr_dev(svg1, "height", "40");
    			attr_dev(svg1, "fill", "currentColor");
    			attr_dev(svg1, "class", "bi bi-github");
    			attr_dev(svg1, "viewBox", "0 0 16 16");
    			add_location(svg1, file$4, 30, 3, 1144);
    			attr_dev(a1, "href", /*github*/ ctx[3]);
    			attr_dev(a1, "target", "__blank");
    			attr_dev(a1, "class", "svelte-hws98i");
    			add_location(a1, file$4, 29, 2, 1106);
    			attr_dev(div1, "class", "dev-links svelte-hws98i");
    			add_location(div1, file$4, 14, 1, 276);
    			attr_dev(div2, "class", "dev svelte-hws98i");
    			add_location(div2, file$4, 7, 0, 100);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, img);
    			append_dev(div2, t0);
    			append_dev(div2, h4);
    			append_dev(h4, t1);
    			append_dev(div2, t2);
    			append_dev(div2, p);
    			append_dev(div2, t4);
    			append_dev(div2, div1);
    			append_dev(div1, a0);
    			append_dev(a0, svg0);
    			append_dev(svg0, path0);
    			append_dev(div1, t5);
    			append_dev(div1, a1);
    			append_dev(a1, svg1);
    			append_dev(svg1, path1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*devImg*/ 1 && !src_url_equal(img.src, img_src_value = /*devImg*/ ctx[0])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*name*/ 2) {
    				attr_dev(img, "alt", /*name*/ ctx[1]);
    			}

    			if (dirty & /*name*/ 2) set_data_dev(t1, /*name*/ ctx[1]);

    			if (dirty & /*linkedin*/ 4) {
    				attr_dev(a0, "href", /*linkedin*/ ctx[2]);
    			}

    			if (dirty & /*github*/ 8) {
    				attr_dev(a1, "href", /*github*/ ctx[3]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ContributorBlock', slots, []);
    	let { devImg } = $$props;
    	let { name } = $$props;
    	let { linkedin } = $$props;
    	let { github } = $$props;
    	const writable_props = ['devImg', 'name', 'linkedin', 'github'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ContributorBlock> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('devImg' in $$props) $$invalidate(0, devImg = $$props.devImg);
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('linkedin' in $$props) $$invalidate(2, linkedin = $$props.linkedin);
    		if ('github' in $$props) $$invalidate(3, github = $$props.github);
    	};

    	$$self.$capture_state = () => ({ devImg, name, linkedin, github });

    	$$self.$inject_state = $$props => {
    		if ('devImg' in $$props) $$invalidate(0, devImg = $$props.devImg);
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('linkedin' in $$props) $$invalidate(2, linkedin = $$props.linkedin);
    		if ('github' in $$props) $$invalidate(3, github = $$props.github);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [devImg, name, linkedin, github];
    }

    class ContributorBlock extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
    			devImg: 0,
    			name: 1,
    			linkedin: 2,
    			github: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContributorBlock",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*devImg*/ ctx[0] === undefined && !('devImg' in props)) {
    			console.warn("<ContributorBlock> was created without expected prop 'devImg'");
    		}

    		if (/*name*/ ctx[1] === undefined && !('name' in props)) {
    			console.warn("<ContributorBlock> was created without expected prop 'name'");
    		}

    		if (/*linkedin*/ ctx[2] === undefined && !('linkedin' in props)) {
    			console.warn("<ContributorBlock> was created without expected prop 'linkedin'");
    		}

    		if (/*github*/ ctx[3] === undefined && !('github' in props)) {
    			console.warn("<ContributorBlock> was created without expected prop 'github'");
    		}
    	}

    	get devImg() {
    		throw new Error("<ContributorBlock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set devImg(value) {
    		throw new Error("<ContributorBlock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<ContributorBlock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<ContributorBlock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get linkedin() {
    		throw new Error("<ContributorBlock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set linkedin(value) {
    		throw new Error("<ContributorBlock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get github() {
    		throw new Error("<ContributorBlock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set github(value) {
    		throw new Error("<ContributorBlock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/header.svelte generated by Svelte v3.43.2 */

    const file$3 = "src/components/header.svelte";

    function create_fragment$3(ctx) {
    	let header;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let p;
    	let t2;
    	let nav;
    	let ul;
    	let t3;
    	let div1;
    	let a0;
    	let svg0;
    	let path0;
    	let t4;
    	let a1;
    	let svg1;
    	let path1;

    	const block = {
    		c: function create() {
    			header = element("header");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			p = element("p");
    			p.textContent = "Sylph";
    			t2 = space();
    			nav = element("nav");
    			ul = element("ul");
    			t3 = space();
    			div1 = element("div");
    			a0 = element("a");
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t4 = space();
    			a1 = element("a");
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			if (!src_url_equal(img.src, img_src_value = "/sylph-mac-icon.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Sylph logo");
    			attr_dev(img, "class", "svelte-11orx5b");
    			add_location(img, file$3, 6, 4, 74);
    			add_location(p, file$3, 7, 4, 129);
    			attr_dev(div0, "class", "sylph-logo svelte-11orx5b");
    			add_location(div0, file$3, 5, 2, 45);
    			attr_dev(ul, "class", "svelte-11orx5b");
    			add_location(ul, file$3, 11, 4, 164);
    			attr_dev(nav, "class", "svelte-11orx5b");
    			add_location(nav, file$3, 10, 2, 154);
    			attr_dev(path0, "d", "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z");
    			add_location(path0, file$3, 34, 8, 761);
    			attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg0, "width", "30");
    			attr_dev(svg0, "height", "30");
    			attr_dev(svg0, "fill", "currentColor");
    			attr_dev(svg0, "class", "bi bi-github");
    			attr_dev(svg0, "viewBox", "0 0 16 16");
    			attr_dev(svg0, "color", "#ffeeaa");
    			add_location(svg0, file$3, 25, 6, 549);
    			attr_dev(a0, "href", "https://github.com/oslabs-beta/Sylph");
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "class", "svelte-11orx5b");
    			add_location(a0, file$3, 24, 4, 479);
    			attr_dev(path1, "d", "M9.025 8c0 2.485-2.02 4.5-4.513 4.5A4.506 4.506 0 0 1 0 8c0-2.486 2.02-4.5 4.512-4.5A4.506 4.506 0 0 1 9.025 8zm4.95 0c0 2.34-1.01 4.236-2.256 4.236-1.246 0-2.256-1.897-2.256-4.236 0-2.34 1.01-4.236 2.256-4.236 1.246 0 2.256 1.897 2.256 4.236zM16 8c0 2.096-.355 3.795-.794 3.795-.438 0-.793-1.7-.793-3.795 0-2.096.355-3.795.794-3.795.438 0 .793 1.699.793 3.795z");
    			add_location(path1, file$3, 52, 8, 1726);
    			attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg1, "width", "30");
    			attr_dev(svg1, "height", "30");
    			attr_dev(svg1, "fill", "currentColor");
    			attr_dev(svg1, "class", "bi bi-medium");
    			attr_dev(svg1, "viewBox", "0 0 16 16");
    			attr_dev(svg1, "color", "#ffeeaa");
    			add_location(svg1, file$3, 43, 6, 1514);
    			attr_dev(a1, "href", "https://medium.com/@sylph.dev.team/sylph-the-svelte-prototyper-f89f20984d4");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "class", "svelte-11orx5b");
    			add_location(a1, file$3, 39, 4, 1389);
    			attr_dev(div1, "class", "header-right svelte-11orx5b");
    			add_location(div1, file$3, 23, 2, 448);
    			attr_dev(header, "class", "svelte-11orx5b");
    			add_location(header, file$3, 4, 0, 34);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, div0);
    			append_dev(div0, img);
    			append_dev(div0, t0);
    			append_dev(div0, p);
    			append_dev(header, t2);
    			append_dev(header, nav);
    			append_dev(nav, ul);
    			append_dev(header, t3);
    			append_dev(header, div1);
    			append_dev(div1, a0);
    			append_dev(a0, svg0);
    			append_dev(svg0, path0);
    			append_dev(div1, t4);
    			append_dev(div1, a1);
    			append_dev(a1, svg1);
    			append_dev(svg1, path1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	let active;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ active });

    	$$self.$inject_state = $$props => {
    		if ('active' in $$props) active = $$props.active;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/components/footer.svelte generated by Svelte v3.43.2 */

    const file$2 = "src/components/footer.svelte";

    function create_fragment$2(ctx) {
    	let footer;
    	let div;
    	let h2;

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			div = element("div");
    			h2 = element("h2");
    			h2.textContent = "Copyright © 2021 Sylph";
    			attr_dev(h2, "class", "svelte-bsk1ze");
    			add_location(h2, file$2, 2, 2, 32);
    			attr_dev(div, "class", "copyw svelte-bsk1ze");
    			add_location(div, file$2, 1, 1, 10);
    			attr_dev(footer, "class", "svelte-bsk1ze");
    			add_location(footer, file$2, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, div);
    			append_dev(div, h2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/components/downloadBtnDynamic.svelte generated by Svelte v3.43.2 */

    const file$1 = "src/components/downloadBtnDynamic.svelte";

    function create_fragment$1(ctx) {
    	let button;
    	let t0_value = `Download for ${/*OS*/ ctx[0]}` + "";
    	let t0;
    	let t1;
    	let span;
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			button = element("button");
    			t0 = text(t0_value);
    			t1 = space();
    			span = element("span");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z");
    			add_location(path, file$1, 14, 3, 322);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", "1.5em");
    			attr_dev(svg, "height", "1.5em");
    			attr_dev(svg, "fill", "currentColor");
    			attr_dev(svg, "class", "bi bi-cloud-arrow-down-fill");
    			attr_dev(svg, "viewBox", "0 0 16 16");
    			add_location(svg, file$1, 13, 2, 173);
    			add_location(span, file$1, 12, 1, 164);
    			attr_dev(button, "class", "download-btn svelte-1eah1sv");
    			add_location(button, file$1, 9, 0, 107);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, t0);
    			append_dev(button, t1);
    			append_dev(button, span);
    			append_dev(span, svg);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*OS*/ 1 && t0_value !== (t0_value = `Download for ${/*OS*/ ctx[0]}` + "")) set_data_dev(t0, t0_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const prerender$1 = true;

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DownloadBtnDynamic', slots, []);
    	let { OS } = $$props;
    	const writable_props = ['OS'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DownloadBtnDynamic> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('OS' in $$props) $$invalidate(0, OS = $$props.OS);
    	};

    	$$self.$capture_state = () => ({ prerender: prerender$1, OS });

    	$$self.$inject_state = $$props => {
    		if ('OS' in $$props) $$invalidate(0, OS = $$props.OS);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [OS];
    }

    class DownloadBtnDynamic extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { OS: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DownloadBtnDynamic",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*OS*/ ctx[0] === undefined && !('OS' in props)) {
    			console.warn("<DownloadBtnDynamic> was created without expected prop 'OS'");
    		}
    	}

    	get OS() {
    		throw new Error("<DownloadBtnDynamic>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set OS(value) {
    		throw new Error("<DownloadBtnDynamic>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    /*!@license
     * UAParser.js v0.7.28
     * Lightweight JavaScript-based User-Agent string parser
     * https://github.com/faisalman/ua-parser-js
     *
     * Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
     * Licensed under MIT License
     */

    var uaParser = createCommonjsModule(function (module, exports) {
    (function (window, undefined$1) {

        //////////////
        // Constants
        /////////////


        var LIBVERSION  = '0.7.28',
            EMPTY       = '',
            UNKNOWN     = '?',
            FUNC_TYPE   = 'function',
            UNDEF_TYPE  = 'undefined',
            OBJ_TYPE    = 'object',
            STR_TYPE    = 'string',
            MAJOR       = 'major', // deprecated
            MODEL       = 'model',
            NAME        = 'name',
            TYPE        = 'type',
            VENDOR      = 'vendor',
            VERSION     = 'version',
            ARCHITECTURE= 'architecture',
            CONSOLE     = 'console',
            MOBILE      = 'mobile',
            TABLET      = 'tablet',
            SMARTTV     = 'smarttv',
            WEARABLE    = 'wearable',
            EMBEDDED    = 'embedded',
            UA_MAX_LENGTH = 255;


        ///////////
        // Helper
        //////////


        var util = {
            extend : function (regexes, extensions) {
                var mergedRegexes = {};
                for (var i in regexes) {
                    if (extensions[i] && extensions[i].length % 2 === 0) {
                        mergedRegexes[i] = extensions[i].concat(regexes[i]);
                    } else {
                        mergedRegexes[i] = regexes[i];
                    }
                }
                return mergedRegexes;
            },
            has : function (str1, str2) {
                return typeof str1 === STR_TYPE ? str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1 : false;
            },
            lowerize : function (str) {
                return str.toLowerCase();
            },
            major : function (version) {
                return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g,'').split(".")[0] : undefined$1;
            },
            trim : function (str, len) {
                str = str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
                return typeof(len) === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
            }
        };


        ///////////////
        // Map helper
        //////////////


        var mapper = {

            rgx : function (ua, arrays) {

                var i = 0, j, k, p, q, matches, match;

                // loop through all regexes maps
                while (i < arrays.length && !matches) {

                    var regex = arrays[i],       // even sequence (0,2,4,..)
                        props = arrays[i + 1];   // odd sequence (1,3,5,..)
                    j = k = 0;

                    // try matching uastring with regexes
                    while (j < regex.length && !matches) {

                        matches = regex[j++].exec(ua);

                        if (!!matches) {
                            for (p = 0; p < props.length; p++) {
                                match = matches[++k];
                                q = props[p];
                                // check if given property is actually array
                                if (typeof q === OBJ_TYPE && q.length > 0) {
                                    if (q.length == 2) {
                                        if (typeof q[1] == FUNC_TYPE) {
                                            // assign modified match
                                            this[q[0]] = q[1].call(this, match);
                                        } else {
                                            // assign given value, ignore regex match
                                            this[q[0]] = q[1];
                                        }
                                    } else if (q.length == 3) {
                                        // check whether function or regex
                                        if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                            // call function (usually string mapper)
                                            this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined$1;
                                        } else {
                                            // sanitize match using given regex
                                            this[q[0]] = match ? match.replace(q[1], q[2]) : undefined$1;
                                        }
                                    } else if (q.length == 4) {
                                            this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined$1;
                                    }
                                } else {
                                    this[q] = match ? match : undefined$1;
                                }
                            }
                        }
                    }
                    i += 2;
                }
            },

            str : function (str, map) {

                for (var i in map) {
                    // check if array
                    if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                        for (var j = 0; j < map[i].length; j++) {
                            if (util.has(map[i][j], str)) {
                                return (i === UNKNOWN) ? undefined$1 : i;
                            }
                        }
                    } else if (util.has(map[i], str)) {
                        return (i === UNKNOWN) ? undefined$1 : i;
                    }
                }
                return str;
            }
        };


        ///////////////
        // String map
        //////////////


        var maps = {

            browser : {
                // Safari < 3.0
                oldSafari : {
                    version : {
                        '1.0'   : '/8',
                        '1.2'   : '/1',
                        '1.3'   : '/3',
                        '2.0'   : '/412',
                        '2.0.2' : '/416',
                        '2.0.3' : '/417',
                        '2.0.4' : '/419',
                        '?'     : '/'
                    }
                },
                oldEdge : {
                    version : {
                        '0.1'   : '12.',
                        '21'    : '13.',
                        '31'    : '14.',
                        '39'    : '15.',
                        '41'    : '16.',
                        '42'    : '17.',
                        '44'    : '18.'
                    }
                }
            },

            os : {
                windows : {
                    version : {
                        'ME'        : '4.90',
                        'NT 3.11'   : 'NT3.51',
                        'NT 4.0'    : 'NT4.0',
                        '2000'      : 'NT 5.0',
                        'XP'        : ['NT 5.1', 'NT 5.2'],
                        'Vista'     : 'NT 6.0',
                        '7'         : 'NT 6.1',
                        '8'         : 'NT 6.2',
                        '8.1'       : 'NT 6.3',
                        '10'        : ['NT 6.4', 'NT 10.0'],
                        'RT'        : 'ARM'
                    }
                }
            }
        };


        //////////////
        // Regex map
        /////////////


        var regexes = {

            browser : [[

                /\b(?:crmo|crios)\/([\w\.]+)/i                                      // Chrome for Android/iOS
                ], [VERSION, [NAME, 'Chrome']], [
                /edg(?:e|ios|a)?\/([\w\.]+)/i                                       // Microsoft Edge
                ], [VERSION, [NAME, 'Edge']], [
                // breaking change (reserved for next major release):
                ///edge\/([\w\.]+)/i                                                  // Old Edge (Trident)
                //], [[VERSION, mapper.str, maps.browser.oldEdge.version], [NAME, 'Edge']], [

                // Presto based
                /(opera\smini)\/([\w\.-]+)/i,                                       // Opera Mini
                /(opera\s[mobiletab]{3,6})\b.+version\/([\w\.-]+)/i,                // Opera Mobi/Tablet
                /(opera)(?:.+version\/|[\/\s]+)([\w\.]+)/i,                         // Opera
                ], [NAME, VERSION], [
                /opios[\/\s]+([\w\.]+)/i                                            // Opera mini on iphone >= 8.0
                ], [VERSION, [NAME, 'Opera Mini']], [
                /\sopr\/([\w\.]+)/i                                                 // Opera Webkit
                ], [VERSION, [NAME, 'Opera']], [

                // Mixed
                /(kindle)\/([\w\.]+)/i,                                             // Kindle
                /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,     // Lunascape/Maxthon/Netfront/Jasmine/Blazer
                // Trident based
                /(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i,             // Avant/IEMobile/SlimBrowser
                /(ba?idubrowser)[\/\s]?([\w\.]+)/i,                                 // Baidu Browser
                /(?:ms|\()(ie)\s([\w\.]+)/i,                                        // Internet Explorer

                // Webkit/KHTML based
                /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i,
                                                                                    // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
                /(rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([\w\.]+)/i,         // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ, aka ShouQ
                /(weibo)__([\d\.]+)/i                                               // Weibo
                ], [NAME, VERSION], [
                /(?:[\s\/]uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i           // UCBrowser
                ], [VERSION, [NAME, 'UCBrowser']], [
                /(?:windowswechat)?\sqbcore\/([\w\.]+)\b.*(?:windowswechat)?/i      // WeChat Desktop for Windows Built-in Browser
                ], [VERSION, [NAME, 'WeChat(Win) Desktop']], [
                /micromessenger\/([\w\.]+)/i                                        // WeChat
                ], [VERSION, [NAME, 'WeChat']], [
                /konqueror\/([\w\.]+)/i                                             // Konqueror
                ], [VERSION, [NAME, 'Konqueror']], [
                /trident.+rv[:\s]([\w\.]{1,9})\b.+like\sgecko/i                     // IE11
                ], [VERSION, [NAME, 'IE']], [
                /yabrowser\/([\w\.]+)/i                                             // Yandex
                ], [VERSION, [NAME, 'Yandex']], [
                /(avast|avg)\/([\w\.]+)/i                                           // Avast/AVG Secure Browser
                ], [[NAME, /(.+)/, '$1 Secure Browser'], VERSION], [
                /focus\/([\w\.]+)/i                                                 // Firefox Focus
                ], [VERSION, [NAME, 'Firefox Focus']], [
                /opt\/([\w\.]+)/i                                                   // Opera Touch
                ], [VERSION, [NAME, 'Opera Touch']], [
                /coc_coc_browser\/([\w\.]+)/i                                       // Coc Coc Browser
                ], [VERSION, [NAME, 'Coc Coc']], [
                /dolfin\/([\w\.]+)/i                                                // Dolphin
                ], [VERSION, [NAME, 'Dolphin']], [
                /coast\/([\w\.]+)/i                                                 // Opera Coast
                ], [VERSION, [NAME, 'Opera Coast']],
                [/xiaomi\/miuibrowser\/([\w\.]+)/i                                  // MIUI Browser
                ], [VERSION, [NAME, 'MIUI Browser']], [
                /fxios\/([\w\.-]+)/i                                                // Firefox for iOS
                ], [VERSION, [NAME, 'Firefox']], [
                /(qihu|qhbrowser|qihoobrowser|360browser)/i                         // 360
                ], [[NAME, '360 Browser']], [
                /(oculus|samsung|sailfish)browser\/([\w\.]+)/i
                ], [[NAME, /(.+)/, '$1 Browser'], VERSION], [                       // Oculus/Samsung/Sailfish Browser
                /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
                ], [[NAME, /_/g, ' '], VERSION], [
                /\s(electron)\/([\w\.]+)\ssafari/i,                                 // Electron-based App
                /(tesla)(?:\sqtcarbrowser|\/(20[12]\d\.[\w\.-]+))/i,                // Tesla
                /m?(qqbrowser|baiduboxapp|2345Explorer)[\/\s]?([\w\.]+)/i           // QQBrowser/Baidu App/2345 Browser
                ], [NAME, VERSION], [
                /(MetaSr)[\/\s]?([\w\.]+)/i,                                        // SouGouBrowser
                /(LBBROWSER)/i                                                      // LieBao Browser
                ], [NAME], [

                // WebView
                /;fbav\/([\w\.]+);/i                                                // Facebook App for iOS & Android with version
                ], [VERSION, [NAME, 'Facebook']], [
                /FBAN\/FBIOS|FB_IAB\/FB4A/i                                         // Facebook App for iOS & Android without version
                ], [[NAME, 'Facebook']], [
                /safari\s(line)\/([\w\.]+)/i,                                       // Line App for iOS
                /\b(line)\/([\w\.]+)\/iab/i,                                        // Line App for Android
                /(chromium|instagram)[\/\s]([\w\.-]+)/i                             // Chromium/Instagram
                ], [NAME, VERSION], [
                /\bgsa\/([\w\.]+)\s.*safari\//i                                     // Google Search Appliance on iOS
                ], [VERSION, [NAME, 'GSA']], [

                /headlesschrome(?:\/([\w\.]+)|\s)/i                                 // Chrome Headless
                ], [VERSION, [NAME, 'Chrome Headless']], [

                /\swv\).+(chrome)\/([\w\.]+)/i                                      // Chrome WebView
                ], [[NAME, 'Chrome WebView'], VERSION], [

                /droid.+\sversion\/([\w\.]+)\b.+(?:mobile\ssafari|safari)/i         // Android Browser
                ], [VERSION, [NAME, 'Android Browser']], [

                /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i      // Chrome/OmniWeb/Arora/Tizen/Nokia
                ], [NAME, VERSION], [

                /version\/([\w\.]+)\s.*mobile\/\w+\s(safari)/i                      // Mobile Safari
                ], [VERSION, [NAME, 'Mobile Safari']], [
                /version\/([\w\.]+)\s.*(mobile\s?safari|safari)/i                   // Safari & Safari Mobile
                ], [VERSION, NAME], [
                /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i                     // Safari < 3.0
                ], [NAME, [VERSION, mapper.str, maps.browser.oldSafari.version]], [

                /(webkit|khtml)\/([\w\.]+)/i
                ], [NAME, VERSION], [

                // Gecko based
                /(navigator|netscape)\/([\w\.-]+)/i                                 // Netscape
                ], [[NAME, 'Netscape'], VERSION], [
                /ile\svr;\srv:([\w\.]+)\).+firefox/i                                // Firefox Reality
                ], [VERSION, [NAME, 'Firefox Reality']], [
                /ekiohf.+(flow)\/([\w\.]+)/i,                                       // Flow
                /(swiftfox)/i,                                                      // Swiftfox
                /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                                                                                    // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
                /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,
                                                                                    // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
                /(firefox)\/([\w\.]+)\s[\w\s\-]+\/[\w\.]+$/i,                       // Other Firefox-based
                /(mozilla)\/([\w\.]+)\s.+rv\:.+gecko\/\d+/i,                        // Mozilla

                // Other
                /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
                                                                                    // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
                /(links)\s\(([\w\.]+)/i,                                            // Links
                /(gobrowser)\/?([\w\.]*)/i,                                         // GoBrowser
                /(ice\s?browser)\/v?([\w\._]+)/i,                                   // ICE Browser
                /(mosaic)[\/\s]([\w\.]+)/i                                          // Mosaic
                ], [NAME, VERSION]
            ],

            cpu : [[

                /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i                     // AMD64 (x64)
                ], [[ARCHITECTURE, 'amd64']], [

                /(ia32(?=;))/i                                                      // IA32 (quicktime)
                ], [[ARCHITECTURE, util.lowerize]], [

                /((?:i[346]|x)86)[;\)]/i                                            // IA32 (x86)
                ], [[ARCHITECTURE, 'ia32']], [

                /\b(aarch64|armv?8e?l?)\b/i                                         // ARM64
                ], [[ARCHITECTURE, 'arm64']], [

                /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i                                   // ARMHF
                ], [[ARCHITECTURE, 'armhf']], [

                // PocketPC mistakenly identified as PowerPC
                /windows\s(ce|mobile);\sppc;/i
                ], [[ARCHITECTURE, 'arm']], [

                /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i                           // PowerPC
                ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [

                /(sun4\w)[;\)]/i                                                    // SPARC
                ], [[ARCHITECTURE, 'sparc']], [

                /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?:64|(?=v(?:[1-7]|[5-7]1)l?|;|eabi))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
                                                                                    // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
                ], [[ARCHITECTURE, util.lowerize]]
            ],

            device : [[

                //////////////////////////
                // MOBILES & TABLETS
                // Ordered by popularity
                /////////////////////////

                // Samsung
                /\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus\s10)/i
                ], [MODEL, [VENDOR, 'Samsung'], [TYPE, TABLET]], [
                /\b((?:s[cgp]h|gt|sm)-\w+|galaxy\snexus)/i,
                /\ssamsung[\s-]([\w-]+)/i,
                /sec-(sgh\w+)/i
                ], [MODEL, [VENDOR, 'Samsung'], [TYPE, MOBILE]], [

                // Apple
                /\((ip(?:hone|od)[\s\w]*);/i                                        // iPod/iPhone
                ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [
                /\((ipad);[\w\s\),;-]+apple/i,                                      // iPad
                /applecoremedia\/[\w\.]+\s\((ipad)/i,
                /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
                ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [

                // Huawei
                /\b((?:agr|ags[23]|bah2?|sht?)-a?[lw]\d{2})/i,
                ], [MODEL, [VENDOR, 'Huawei'], [TYPE, TABLET]], [
                /d\/huawei([\w\s-]+)[;\)]/i,
                /\b(nexus\s6p|vog-[at]?l\d\d|ane-[at]?l[x\d]\d|eml-a?l\d\da?|lya-[at]?l\d[\dc]|clt-a?l\d\di?|ele-l\d\d)/i,
                /\b(\w{2,4}-[atu][ln][01259][019])[;\)\s]/i
                ], [MODEL, [VENDOR, 'Huawei'], [TYPE, MOBILE]], [

                // Xiaomi
                /\b(poco[\s\w]+)(?:\sbuild|\))/i,                                   // Xiaomi POCO
                /\b;\s(\w+)\sbuild\/hm\1/i,                                         // Xiaomi Hongmi 'numeric' models
                /\b(hm[\s\-_]?note?[\s_]?(?:\d\w)?)\sbuild/i,                       // Xiaomi Hongmi
                /\b(redmi[\s\-_]?(?:note|k)?[\w\s_]+)(?:\sbuild|\))/i,              // Xiaomi Redmi
                /\b(mi[\s\-_]?(?:a\d|one|one[\s_]plus|note lte)?[\s_]?(?:\d?\w?)[\s_]?(?:plus)?)\sbuild/i  // Xiaomi Mi
                ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [
                /\b(mi[\s\-_]?(?:pad)(?:[\w\s_]+))(?:\sbuild|\))/i                  // Mi Pad tablets
                ],[[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, TABLET]], [

                // OPPO
                /;\s(\w+)\sbuild.+\soppo/i,
                /\s(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007)\b/i
                ], [MODEL, [VENDOR, 'OPPO'], [TYPE, MOBILE]], [

                // Vivo
                /\svivo\s(\w+)(?:\sbuild|\))/i,
                /\s(v[12]\d{3}\w?[at])(?:\sbuild|;)/i
                ], [MODEL, [VENDOR, 'Vivo'], [TYPE, MOBILE]], [

                // Realme
                /\s(rmx[12]\d{3})(?:\sbuild|;)/i
                ], [MODEL, [VENDOR, 'Realme'], [TYPE, MOBILE]], [

                // Motorola
                /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)\b[\w\s]+build\//i,
                /\smot(?:orola)?[\s-](\w*)/i,
                /((?:moto[\s\w\(\)]+|xt\d{3,4}|nexus\s6)(?=\sbuild|\)))/i
                ], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [
                /\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i
                ], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [

                // LG
                /((?=lg)?[vl]k\-?\d{3})\sbuild|\s3\.[\s\w;-]{10}lg?-([06cv9]{3,4})/i
                ], [MODEL, [VENDOR, 'LG'], [TYPE, TABLET]], [
                /(lm-?f100[nv]?|nexus\s[45])/i,
                /lg[e;\s\/-]+((?!browser|netcast)\w+)/i,
                /\blg(\-?[\d\w]+)\sbuild/i
                ], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [

                // Lenovo
                /(ideatab[\w\-\s]+)/i,
                /lenovo\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+)|yt[\d\w-]{6}|tb[\d\w-]{6})/i        // Lenovo tablets
                ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [

                // Nokia
                /(?:maemo|nokia).*(n900|lumia\s\d+)/i,
                /nokia[\s_-]?([\w\.-]*)/i
                ], [[MODEL, /_/g, ' '], [VENDOR, 'Nokia'], [TYPE, MOBILE]], [

                // Google
                /droid.+;\s(pixel\sc)[\s)]/i                                        // Google Pixel C
                ], [MODEL, [VENDOR, 'Google'], [TYPE, TABLET]], [
                /droid.+;\s(pixel[\s\daxl]{0,6})(?:\sbuild|\))/i                    // Google Pixel
                ], [MODEL, [VENDOR, 'Google'], [TYPE, MOBILE]], [

                // Sony
                /droid.+\s([c-g]\d{4}|so[-l]\w+|xq-a\w[4-7][12])(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i
                ], [MODEL, [VENDOR, 'Sony'], [TYPE, MOBILE]], [
                /sony\stablet\s[ps]\sbuild\//i,
                /(?:sony)?sgp\w+(?:\sbuild\/|\))/i
                ], [[MODEL, 'Xperia Tablet'], [VENDOR, 'Sony'], [TYPE, TABLET]], [

                // OnePlus
                /\s(kb2005|in20[12]5|be20[12][59])\b/i,
                /\ba000(1)\sbuild/i,                                                // OnePlus
                /\boneplus\s(a\d{4})[\s)]/i
                ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

                // Amazon
                /(alexa)webm/i,
                /(kf[a-z]{2}wi)(\sbuild\/|\))/i,                                    // Kindle Fire without Silk
                /(kf[a-z]+)(\sbuild\/|\)).+silk\//i                                 // Kindle Fire HD
                ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [
                /(sd|kf)[0349hijorstuw]+(\sbuild\/|\)).+silk\//i                    // Fire Phone
                ], [[MODEL, 'Fire Phone'], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [

                // BlackBerry
                /\((playbook);[\w\s\),;-]+(rim)/i                                   // BlackBerry PlayBook
                ], [MODEL, VENDOR, [TYPE, TABLET]], [
                /((?:bb[a-f]|st[hv])100-\d)/i,
                /\(bb10;\s(\w+)/i                                                   // BlackBerry 10
                ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [

                // Asus
                /(?:\b|asus_)(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus\s7|padfone|p00[cj])/i
                ], [MODEL, [VENDOR, 'ASUS'], [TYPE, TABLET]], [
                /\s(z[es]6[027][01][km][ls]|zenfone\s\d\w?)\b/i
                ], [MODEL, [VENDOR, 'ASUS'], [TYPE, MOBILE]], [

                // HTC
                /(nexus\s9)/i                                                       // HTC Nexus 9
                ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [
                /(htc)[;_\s-]{1,2}([\w\s]+(?=\)|\sbuild)|\w+)/i,                    // HTC

                // ZTE
                /(zte)-(\w*)/i,
                /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
                ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

                // Acer
                /droid[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i
                ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

                // Meizu
                /droid.+;\s(m[1-5]\snote)\sbuild/i,
                /\bmz-([\w-]{2,})/i
                ], [MODEL, [VENDOR, 'Meizu'], [TYPE, MOBILE]], [

                // MIXED
                /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
                                                                                    // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
                /(hp)\s([\w\s]+\w)/i,                                               // HP iPAQ
                /(asus)-?(\w+)/i,                                                   // Asus
                /(microsoft);\s(lumia[\s\w]+)/i,                                    // Microsoft Lumia
                /(lenovo)[_\s-]?([\w-]+)/i,                                         // Lenovo
                /linux;.+(jolla);/i,                                                // Jolla
                /droid.+;\s(oppo)\s?([\w\s]+)\sbuild/i                              // OPPO
                ], [VENDOR, MODEL, [TYPE, MOBILE]], [

                /(archos)\s(gamepad2?)/i,                                           // Archos
                /(hp).+(touchpad(?!.+tablet)|tablet)/i,                             // HP TouchPad
                /(kindle)\/([\w\.]+)/i,                                             // Kindle
                /\s(nook)[\w\s]+build\/(\w+)/i,                                     // Nook
                /(dell)\s(strea[kpr\s\d]*[\dko])/i,                                 // Dell Streak
                /[;\/]\s?(le[\s\-]+pan)[\s\-]+(\w{1,9})\sbuild/i,                   // Le Pan Tablets
                /[;\/]\s?(trinity)[\-\s]*(t\d{3})\sbuild/i,                         // Trinity Tablets
                /\b(gigaset)[\s\-]+(q\w{1,9})\sbuild/i,                             // Gigaset Tablets
                /\b(vodafone)\s([\w\s]+)(?:\)|\sbuild)/i                            // Vodafone
                ], [VENDOR, MODEL, [TYPE, TABLET]], [

                /\s(surface\sduo)\s/i                                               // Surface Duo
                ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, TABLET]], [
                /droid\s[\d\.]+;\s(fp\du?)\sbuild/i
                ], [MODEL, [VENDOR, 'Fairphone'], [TYPE, MOBILE]], [
                /\s(u304aa)\sbuild/i                                                // AT&T
                ], [MODEL, [VENDOR, 'AT&T'], [TYPE, MOBILE]], [
                /sie-(\w*)/i                                                        // Siemens
                ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [
                /[;\/]\s?(rct\w+)\sbuild/i                                          // RCA Tablets
                ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [
                /[;\/\s](venue[\d\s]{2,7})\sbuild/i                                 // Dell Venue Tablets
                ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [
                /[;\/]\s?(q(?:mv|ta)\w+)\sbuild/i                                   // Verizon Tablet
                ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [
                /[;\/]\s(?:barnes[&\s]+noble\s|bn[rt])([\w\s\+]*)\sbuild/i          // Barnes & Noble Tablet
                ], [MODEL, [VENDOR, 'Barnes & Noble'], [TYPE, TABLET]], [
                /[;\/]\s(tm\d{3}\w+)\sbuild/i
                ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [
                /;\s(k88)\sbuild/i                                                  // ZTE K Series Tablet
                ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [
                /;\s(nx\d{3}j)\sbuild/i                                             // ZTE Nubia
                ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [
                /[;\/]\s?(gen\d{3})\sbuild.*49h/i                                   // Swiss GEN Mobile
                ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [
                /[;\/]\s?(zur\d{3})\sbuild/i                                        // Swiss ZUR Tablet
                ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [
                /[;\/]\s?((zeki)?tb.*\b)\sbuild/i                                   // Zeki Tablets
                ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [
                /[;\/]\s([yr]\d{2})\sbuild/i,
                /[;\/]\s(dragon[\-\s]+touch\s|dt)(\w{5})\sbuild/i                   // Dragon Touch Tablet
                ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [
                /[;\/]\s?(ns-?\w{0,9})\sbuild/i                                     // Insignia Tablets
                ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [
                /[;\/]\s?((nxa|Next)-?\w{0,9})\sbuild/i                             // NextBook Tablets
                ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [
                /[;\/]\s?(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05]))\sbuild/i
                ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [                    // Voice Xtreme Phones
                /[;\/]\s?(lvtel\-)?(v1[12])\sbuild/i                                // LvTel Phones
                ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [
                /;\s(ph-1)\s/i
                ], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [                // Essential PH-1
                /[;\/]\s?(v(100md|700na|7011|917g).*\b)\sbuild/i                    // Envizen Tablets
                ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [
                /[;\/]\s?(trio[\s\w\-\.]+)\sbuild/i                                 // MachSpeed Tablets
                ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [
                /[;\/]\s?tu_(1491)\sbuild/i                                         // Rotor Tablets
                ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [
                /(shield[\w\s]+)\sbuild/i                                           // Nvidia Shield Tablets
                ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, TABLET]], [
                /(sprint)\s(\w+)/i                                                  // Sprint Phones
                ], [VENDOR, MODEL, [TYPE, MOBILE]], [
                /(kin\.[onetw]{3})/i                                                // Microsoft Kin
                ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [
                /droid\s[\d\.]+;\s(cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i     // Zebra
                ], [MODEL, [VENDOR, 'Zebra'], [TYPE, TABLET]], [
                /droid\s[\d\.]+;\s(ec30|ps20|tc[2-8]\d[kx])\)/i
                ], [MODEL, [VENDOR, 'Zebra'], [TYPE, MOBILE]], [

                ///////////////////
                // CONSOLES
                ///////////////////

                /\s(ouya)\s/i,                                                      // Ouya
                /(nintendo)\s([wids3utch]+)/i                                       // Nintendo
                ], [VENDOR, MODEL, [TYPE, CONSOLE]], [
                /droid.+;\s(shield)\sbuild/i                                        // Nvidia
                ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [
                /(playstation\s[345portablevi]+)/i                                  // Playstation
                ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [
                /[\s\(;](xbox(?:\sone)?(?!;\sxbox))[\s\);]/i                        // Microsoft Xbox
                ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [

                ///////////////////
                // SMARTTVS
                ///////////////////

                /smart-tv.+(samsung)/i                                              // Samsung
                ], [VENDOR, [TYPE, SMARTTV]], [
                /hbbtv.+maple;(\d+)/i
                ], [[MODEL, /^/, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]], [
                /(?:linux;\snetcast.+smarttv|lg\snetcast\.tv-201\d)/i,              // LG SmartTV
                ], [[VENDOR, 'LG'], [TYPE, SMARTTV]], [
                /(apple)\s?tv/i                                                     // Apple TV
                ], [VENDOR, [MODEL, 'Apple TV'], [TYPE, SMARTTV]], [
                /crkey/i                                                            // Google Chromecast
                ], [[MODEL, 'Chromecast'], [VENDOR, 'Google'], [TYPE, SMARTTV]], [
                /droid.+aft([\w])(\sbuild\/|\))/i                                   // Fire TV
                ], [MODEL, [VENDOR, 'Amazon'], [TYPE, SMARTTV]], [
                /\(dtv[\);].+(aquos)/i                                              // Sharp
                ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [
                /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i            // HbbTV devices
                ], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [
                /[\s\/\(](android\s|smart[-\s]?|opera\s)tv[;\)\s]/i                 // SmartTV from Unidentified Vendors
                ], [[TYPE, SMARTTV]], [

                ///////////////////
                // WEARABLES
                ///////////////////

                /((pebble))app\/[\d\.]+\s/i                                         // Pebble
                ], [VENDOR, MODEL, [TYPE, WEARABLE]], [
                /droid.+;\s(glass)\s\d/i                                            // Google Glass
                ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [
                /droid\s[\d\.]+;\s(wt63?0{2,3})\)/i
                ], [MODEL, [VENDOR, 'Zebra'], [TYPE, WEARABLE]], [

                ///////////////////
                // EMBEDDED
                ///////////////////

                /(tesla)(?:\sqtcarbrowser|\/20[12]\d\.[\w\.-]+)/i                   // Tesla
                ], [VENDOR, [TYPE, EMBEDDED]], [

                ////////////////////
                // MIXED (GENERIC)
                ///////////////////

                /droid .+?; ([^;]+?)(?: build|\) applewebkit).+? mobile safari/i    // Android Phones from Unidentified Vendors
                ], [MODEL, [TYPE, MOBILE]], [
                /droid .+?;\s([^;]+?)(?: build|\) applewebkit).+?(?! mobile) safari/i  // Android Tablets from Unidentified Vendors
                ], [MODEL, [TYPE, TABLET]], [
                /\s(tablet|tab)[;\/]/i,                                             // Unidentifiable Tablet
                /\s(mobile)(?:[;\/]|\ssafari)/i                                     // Unidentifiable Mobile
                ], [[TYPE, util.lowerize]], [
                /(android[\w\.\s\-]{0,9});.+build/i                                 // Generic Android Device
                ], [MODEL, [VENDOR, 'Generic']], [
                /(phone)/i
                ], [[TYPE, MOBILE]]
            ],

            engine : [[

                /windows.+\sedge\/([\w\.]+)/i                                       // EdgeHTML
                ], [VERSION, [NAME, 'EdgeHTML']], [

                /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i                         // Blink
                ], [VERSION, [NAME, 'Blink']], [

                /(presto)\/([\w\.]+)/i,                                             // Presto
                /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
                /ekioh(flow)\/([\w\.]+)/i,                                          // Flow
                /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,                          // KHTML/Tasman/Links
                /(icab)[\/\s]([23]\.[\d\.]+)/i                                      // iCab
                ], [NAME, VERSION], [

                /rv\:([\w\.]{1,9})\b.+(gecko)/i                                     // Gecko
                ], [VERSION, NAME]
            ],

            os : [[

                // Windows
                /microsoft\s(windows)\s(vista|xp)/i                                 // Windows (iTunes)
                ], [NAME, VERSION], [
                /(windows)\snt\s6\.2;\s(arm)/i,                                     // Windows RT
                /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,                   // Windows Phone
                /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)(?!.+xbox)/i
                ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [
                /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
                ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

                // iOS/macOS
                /ip[honead]{2,4}\b(?:.*os\s([\w]+)\slike\smac|;\sopera)/i,          // iOS
                /cfnetwork\/.+darwin/i
                ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [
                /(mac\sos\sx)\s?([\w\s\.]*)/i,
                /(macintosh|mac(?=_powerpc)\s)(?!.+haiku)/i                         // Mac OS
                ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

                // Mobile OSes                                                      // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki/Sailfish OS
                /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i,
                /(blackberry)\w*\/([\w\.]*)/i,                                      // Blackberry
                /(tizen|kaios)[\/\s]([\w\.]+)/i,                                    // Tizen/KaiOS
                /\((series40);/i                                                    // Series 40
                ], [NAME, VERSION], [
                /\(bb(10);/i                                                        // BlackBerry 10
                ], [VERSION, [NAME, 'BlackBerry']], [
                /(?:symbian\s?os|symbos|s60(?=;)|series60)[\/\s-]?([\w\.]*)/i       // Symbian
                ], [VERSION, [NAME, 'Symbian']], [
                /mozilla.+\(mobile;.+gecko.+firefox/i                               // Firefox OS
                ], [[NAME, 'Firefox OS']], [
                /web0s;.+rt(tv)/i,
                /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i                              // WebOS
                ], [VERSION, [NAME, 'webOS']], [

                // Google Chromecast
                /crkey\/([\d\.]+)/i                                                 // Google Chromecast
                ], [VERSION, [NAME, 'Chromecast']], [
                /(cros)\s[\w]+\s([\w\.]+\w)/i                                       // Chromium OS
                ], [[NAME, 'Chromium OS'], VERSION],[

                // Console
                /(nintendo|playstation)\s([wids345portablevuch]+)/i,                // Nintendo/Playstation
                /(xbox);\s+xbox\s([^\);]+)/i,                                       // Microsoft Xbox (360, One, X, S, Series X, Series S)

                // GNU/Linux based
                /(mint)[\/\s\(\)]?(\w*)/i,                                          // Mint
                /(mageia|vectorlinux)[;\s]/i,                                       // Mageia/VectorLinux
                /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?=\slinux)|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus|raspbian)(?:\sgnu\/linux)?(?:\slinux)?[\/\s-]?(?!chrom|package)([\w\.-]*)/i,
                                                                                    // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
                                                                                    // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
                /(hurd|linux)\s?([\w\.]*)/i,                                        // Hurd/Linux
                /(gnu)\s?([\w\.]*)/i,                                               // GNU

                // BSD based
                /\s([frentopc-]{0,4}bsd|dragonfly)\s?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,  // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
                /(haiku)\s(\w+)/i                                                   // Haiku
                ], [NAME, VERSION], [

                // Other
                /(sunos)\s?([\w\.\d]*)/i                                            // Solaris
                ], [[NAME, 'Solaris'], VERSION], [
                /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,                             // Solaris
                /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,                                // AIX
                /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,  // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS/Fuchsia
                /(unix)\s?([\w\.]*)/i                                               // UNIX
                ], [NAME, VERSION]
            ]
        };


        /////////////////
        // Constructor
        ////////////////
        var UAParser = function (ua, extensions) {

            if (typeof ua === 'object') {
                extensions = ua;
                ua = undefined$1;
            }

            if (!(this instanceof UAParser)) {
                return new UAParser(ua, extensions).getResult();
            }

            var _ua = ua || ((typeof window !== 'undefined' && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
            var _rgxmap = extensions ? util.extend(regexes, extensions) : regexes;

            this.getBrowser = function () {
                var _browser = { name: undefined$1, version: undefined$1 };
                mapper.rgx.call(_browser, _ua, _rgxmap.browser);
                _browser.major = util.major(_browser.version); // deprecated
                return _browser;
            };
            this.getCPU = function () {
                var _cpu = { architecture: undefined$1 };
                mapper.rgx.call(_cpu, _ua, _rgxmap.cpu);
                return _cpu;
            };
            this.getDevice = function () {
                var _device = { vendor: undefined$1, model: undefined$1, type: undefined$1 };
                mapper.rgx.call(_device, _ua, _rgxmap.device);
                return _device;
            };
            this.getEngine = function () {
                var _engine = { name: undefined$1, version: undefined$1 };
                mapper.rgx.call(_engine, _ua, _rgxmap.engine);
                return _engine;
            };
            this.getOS = function () {
                var _os = { name: undefined$1, version: undefined$1 };
                mapper.rgx.call(_os, _ua, _rgxmap.os);
                return _os;
            };
            this.getResult = function () {
                return {
                    ua      : this.getUA(),
                    browser : this.getBrowser(),
                    engine  : this.getEngine(),
                    os      : this.getOS(),
                    device  : this.getDevice(),
                    cpu     : this.getCPU()
                };
            };
            this.getUA = function () {
                return _ua;
            };
            this.setUA = function (ua) {
                _ua = (typeof ua === STR_TYPE && ua.length > UA_MAX_LENGTH) ? util.trim(ua, UA_MAX_LENGTH) : ua;
                return this;
            };
            this.setUA(_ua);
            return this;
        };

        UAParser.VERSION = LIBVERSION;
        UAParser.BROWSER = {
            NAME    : NAME,
            MAJOR   : MAJOR, // deprecated
            VERSION : VERSION
        };
        UAParser.CPU = {
            ARCHITECTURE : ARCHITECTURE
        };
        UAParser.DEVICE = {
            MODEL   : MODEL,
            VENDOR  : VENDOR,
            TYPE    : TYPE,
            CONSOLE : CONSOLE,
            MOBILE  : MOBILE,
            SMARTTV : SMARTTV,
            TABLET  : TABLET,
            WEARABLE: WEARABLE,
            EMBEDDED: EMBEDDED
        };
        UAParser.ENGINE = {
            NAME    : NAME,
            VERSION : VERSION
        };
        UAParser.OS = {
            NAME    : NAME,
            VERSION : VERSION
        };

        ///////////
        // Export
        //////////


        // check js environment
        {
            // nodejs env
            if (module.exports) {
                exports = module.exports = UAParser;
            }
            exports.UAParser = UAParser;
        }

        // jQuery/Zepto specific (optional)
        // Note:
        //   In AMD env the global scope should be kept clean, but jQuery is an exception.
        //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
        //   and we should catch that.
        var $ = typeof window !== 'undefined' && (window.jQuery || window.Zepto);
        if ($ && !$.ua) {
            var parser = new UAParser();
            $.ua = parser.getResult();
            $.ua.get = function () {
                return parser.getUA();
            };
            $.ua.set = function (uastring) {
                parser.setUA(uastring);
                var result = parser.getResult();
                for (var prop in result) {
                    $.ua[prop] = result[prop];
                }
            };
        }

    })(typeof window === 'object' ? window : commonjsGlobal);
    });

    let parser = new uaParser();

    const OS = parser.getOS();
    console.log('OS USER OS', OS);

    const version = (OS) => {
      if (OS?.name === 'Mac OS') {
        return 'https://github.com/oslabs-beta/Sylph/releases/download/v1.0.0-Beta-Mac/Sylph-1.0.0.dmg';
      }
      if (OS?.name === 'Windows') {
        return 'https://github.com/oslabs-beta/Sylph/releases/download/v1.0.0-beta/Sylph.Setup.1.0.0.exe';
      }
    };
    const sylphVersion = version(OS);

    /* src/App.svelte generated by Svelte v3.43.2 */
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let t0;
    	let header;
    	let t1;
    	let container;
    	let section0;
    	let div0;
    	let h20;
    	let t3;
    	let h10;
    	let t5;
    	let p0;
    	let t7;
    	let p1;
    	let t9;
    	let form0;
    	let downloadbtndynamic0;
    	let t10;
    	let div1;
    	let img0;
    	let img0_src_value;
    	let t11;
    	let section1;
    	let div2;
    	let h11;
    	let t13;
    	let div3;
    	let p2;
    	let strong0;
    	let em0;
    	let t15;
    	let t16;
    	let p3;
    	let t17;
    	let strong1;
    	let em1;
    	let t19;
    	let t20;
    	let section2;
    	let div6;
    	let div4;
    	let img1;
    	let img1_src_value;
    	let t21;
    	let h21;
    	let t23;
    	let p4;
    	let strong2;
    	let em2;
    	let t25;
    	let t26;
    	let div5;
    	let img2;
    	let img2_src_value;
    	let t27;
    	let div9;
    	let div7;
    	let img3;
    	let img3_src_value;
    	let t28;
    	let div8;
    	let svg0;
    	let path0;
    	let t29;
    	let h22;
    	let t31;
    	let p5;
    	let strong3;
    	let em3;
    	let t33;
    	let t34;
    	let div12;
    	let div10;
    	let svg1;
    	let path1;
    	let path2;
    	let t35;
    	let h23;
    	let t37;
    	let p6;
    	let strong4;
    	let em4;
    	let t39;
    	let t40;
    	let div11;
    	let img4;
    	let img4_src_value;
    	let t41;
    	let section3;
    	let div13;
    	let h12;
    	let t43;
    	let div16;
    	let div14;
    	let svg2;
    	let path3;
    	let t44;
    	let form1;
    	let downloadbtndynamic1;
    	let t45;
    	let div15;
    	let svg3;
    	let path4;
    	let path5;
    	let t46;
    	let form2;
    	let downloadbtndynamic2;
    	let t47;
    	let section4;
    	let h13;
    	let t49;
    	let div17;
    	let contributorblock0;
    	let t50;
    	let contributorblock1;
    	let t51;
    	let contributorblock2;
    	let t52;
    	let contributorblock3;
    	let t53;
    	let footer;
    	let current;
    	header = new Header({ $$inline: true });
    	downloadbtndynamic0 = new DownloadBtnDynamic({ props: { OS: OS.name }, $$inline: true });
    	downloadbtndynamic1 = new DownloadBtnDynamic({ props: { OS: 'Windows' }, $$inline: true });
    	downloadbtndynamic2 = new DownloadBtnDynamic({ props: { OS: 'Mac OS' }, $$inline: true });

    	contributorblock0 = new ContributorBlock({
    			props: {
    				devImg: "https://media-exp1.licdn.com/dms/image/C4D03AQGA6GbnL7avug/profile-displayphoto-shrink_800_800/0/1631750855713?e=1639612800&v=beta&t=pbtoVQC0qc8Ap0n2dRDbj7qvyYN8fwVApYtQsZqu4Ks",
    				name: "Randy Diebold",
    				linkedin: "https://www.linkedin.com/in/randy-diebold-523802206/",
    				github: "https://github.com/Randy-diebold"
    			},
    			$$inline: true
    		});

    	contributorblock1 = new ContributorBlock({
    			props: {
    				devImg: "https://media-exp1.licdn.com/dms/image/C4D03AQFkBD1Q_j8AAw/profile-displayphoto-shrink_800_800/0/1563465185947?e=1639612800&v=beta&t=-8k7a0_FGR6M7eaQeMdNbfyLlD3DD0ETRNZSWAR5ipc",
    				name: "Kailee Pedersen",
    				linkedin: "https://www.linkedin.com/in/kaileepedersen/",
    				github: "https://github.com/kailee-p"
    			},
    			$$inline: true
    		});

    	contributorblock2 = new ContributorBlock({
    			props: {
    				devImg: "https://media-exp1.licdn.com/dms/image/C4E03AQEKSfkLzET2Dw/profile-displayphoto-shrink_800_800/0/1629157163376?e=1639612800&v=beta&t=Dr92AuQHcyoSBWiZSq1LgPTqkqmCSGjnKrUfHcCIcmE",
    				name: "Haobo Wang",
    				linkedin: "https://www.linkedin.com/in/haobowang225/",
    				github: "https://github.com/hwpanda"
    			},
    			$$inline: true
    		});

    	contributorblock3 = new ContributorBlock({
    			props: {
    				devImg: "https://media-exp1.licdn.com/dms/image/C4E03AQF499xOPl_xjQ/profile-displayphoto-shrink_800_800/0/1631916229559?e=1639612800&v=beta&t=lQ3b5BwuQETt64nYRZzq8SMzN3-c6wvPvIAFVDyD0wQ",
    				name: "Nick Andreala",
    				linkedin: "https://www.linkedin.com/in/nickandreala/",
    				github: "https://github.com/JovianDev"
    			},
    			$$inline: true
    		});

    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			t0 = space();
    			create_component(header.$$.fragment);
    			t1 = space();
    			container = element("container");
    			section0 = element("section");
    			div0 = element("div");
    			h20 = element("h2");
    			h20.textContent = "Svelte Prototyping";
    			t3 = space();
    			h10 = element("h1");
    			h10.textContent = "SIMPLIFIED";
    			t5 = space();
    			p0 = element("p");
    			p0.textContent = "An Open Source Drag and Drop";
    			t7 = space();
    			p1 = element("p");
    			p1.textContent = "Svelte Prototyping App";
    			t9 = space();
    			form0 = element("form");
    			create_component(downloadbtndynamic0.$$.fragment);
    			t10 = space();
    			div1 = element("div");
    			img0 = element("img");
    			t11 = space();
    			section1 = element("section");
    			div2 = element("div");
    			h11 = element("h1");
    			h11.textContent = "What is Sylph?";
    			t13 = space();
    			div3 = element("div");
    			p2 = element("p");
    			strong0 = element("strong");
    			em0 = element("em");
    			em0.textContent = "Sylph";
    			t15 = text(" is a prototyping tool for Svelte web applications.\n        With its convenient drag-and-drop interface, component customizer, real-time\n        code preview, and real-time site preview, Sylph allows users to quickly prototype\n        and develop the architecture of their Svelte applications.");
    			t16 = space();
    			p3 = element("p");
    			t17 = text("Harnessing the power of Electron, TypeScript, and Svelte, ");
    			strong1 = element("strong");
    			em1 = element("em");
    			em1.textContent = "Sylph";
    			t19 = text(" provides an open-source solution for the fast-growing Svelte community's\n        prototyping needs. Sylph is available for Mac and Windows operating systems.");
    			t20 = space();
    			section2 = element("section");
    			div6 = element("div");
    			div4 = element("div");
    			img1 = element("img");
    			t21 = space();
    			h21 = element("h2");
    			h21.textContent = "Drag and Drop";
    			t23 = space();
    			p4 = element("p");
    			strong2 = element("strong");
    			em2 = element("em");
    			em2.textContent = "Sylph";
    			t25 = text(" features a simple drag and drop interface\n          that allows for a wide experience range of software engineers to quickly\n          prototype Svelte projects by dragging and nesting components into the sandbox,\n          complete with the ability to edit attributes and styles within the element\n          or global scope.");
    			t26 = space();
    			div5 = element("div");
    			img2 = element("img");
    			t27 = space();
    			div9 = element("div");
    			div7 = element("div");
    			img3 = element("img");
    			t28 = space();
    			div8 = element("div");
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t29 = space();
    			h22 = element("h2");
    			h22.textContent = "Live Previews";
    			t31 = space();
    			p5 = element("p");
    			strong3 = element("strong");
    			em3 = element("em");
    			em3.textContent = "Sylph's";
    			t33 = text(" preview window visualizes the generated\n          Svelte code and/or the DOM which updates live as you work so changes can\n          be monitored instantly, making it truly a WYSIWYG application.");
    			t34 = space();
    			div12 = element("div");
    			div10 = element("div");
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			path2 = svg_element("path");
    			t35 = space();
    			h23 = element("h2");
    			h23.textContent = "Complete Projects";
    			t37 = space();
    			p6 = element("p");
    			strong4 = element("strong");
    			em4 = element("em");
    			em4.textContent = "Sylph";
    			t39 = text(" doesn't just simply create code snippets\n          to copy and paste into an editor, it creates the entire svelte project,\n          saved on your local machine, ready to be opened in your favorite code editor\n          to build out the prototype created in the application.");
    			t40 = space();
    			div11 = element("div");
    			img4 = element("img");
    			t41 = space();
    			section3 = element("section");
    			div13 = element("div");
    			h12 = element("h1");
    			h12.textContent = "Download Sylph";
    			t43 = space();
    			div16 = element("div");
    			div14 = element("div");
    			svg2 = svg_element("svg");
    			path3 = svg_element("path");
    			t44 = space();
    			form1 = element("form");
    			create_component(downloadbtndynamic1.$$.fragment);
    			t45 = space();
    			div15 = element("div");
    			svg3 = svg_element("svg");
    			path4 = svg_element("path");
    			path5 = svg_element("path");
    			t46 = space();
    			form2 = element("form");
    			create_component(downloadbtndynamic2.$$.fragment);
    			t47 = space();
    			section4 = element("section");
    			h13 = element("h1");
    			h13.textContent = "Sylph Contributors";
    			t49 = space();
    			div17 = element("div");
    			create_component(contributorblock0.$$.fragment);
    			t50 = space();
    			create_component(contributorblock1.$$.fragment);
    			t51 = space();
    			create_component(contributorblock2.$$.fragment);
    			t52 = space();
    			create_component(contributorblock3.$$.fragment);
    			t53 = space();
    			create_component(footer.$$.fragment);
    			document.title = "Sylph";
    			attr_dev(h20, "class", "svelte-19qg85v");
    			add_location(h20, file, 19, 6, 559);
    			attr_dev(h10, "class", "svelte-19qg85v");
    			add_location(h10, file, 20, 6, 593);
    			attr_dev(p0, "class", "svelte-19qg85v");
    			add_location(p0, file, 21, 6, 619);
    			attr_dev(p1, "class", "svelte-19qg85v");
    			add_location(p1, file, 22, 6, 661);
    			attr_dev(form0, "action", sylphVersion);
    			attr_dev(form0, "method", "get");
    			attr_dev(form0, "target", "_blank");
    			attr_dev(form0, "class", "DL-form svelte-19qg85v");
    			add_location(form0, file, 23, 6, 697);
    			attr_dev(div0, "class", "title-text svelte-19qg85v");
    			add_location(div0, file, 18, 4, 528);
    			if (!src_url_equal(img0.src, img0_src_value = "/sylph-screen.png")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "sylph screen shot");
    			attr_dev(img0, "class", "svelte-19qg85v");
    			add_location(img0, file, 28, 6, 874);
    			attr_dev(div1, "class", "title-img svelte-19qg85v");
    			add_location(div1, file, 27, 4, 844);
    			attr_dev(section0, "class", "title-head svelte-19qg85v");
    			add_location(section0, file, 17, 2, 495);
    			add_location(h11, file, 44, 6, 1358);
    			attr_dev(div2, "class", "about-head svelte-19qg85v");
    			add_location(div2, file, 43, 4, 1327);
    			add_location(em0, file, 48, 16, 1448);
    			add_location(strong0, file, 48, 8, 1440);
    			add_location(p2, file, 47, 6, 1428);
    			add_location(em1, file, 55, 11, 1871);
    			add_location(strong1, file, 54, 66, 1852);
    			add_location(p3, file, 53, 6, 1782);
    			attr_dev(div3, "class", "about-text svelte-19qg85v");
    			add_location(div3, file, 46, 4, 1397);
    			attr_dev(section1, "class", "about svelte-19qg85v");
    			add_location(section1, file, 42, 2, 1299);
    			if (!src_url_equal(img1.src, img1_src_value = "/dnd.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "feature icon");
    			attr_dev(img1, "class", "feature-icon svelte-19qg85v");
    			add_location(img1, file, 64, 8, 2200);
    			attr_dev(h21, "class", "svelte-19qg85v");
    			add_location(h21, file, 65, 8, 2271);
    			add_location(em2, file, 67, 18, 2324);
    			add_location(strong2, file, 67, 10, 2316);
    			attr_dev(p4, "class", "svelte-19qg85v");
    			add_location(p4, file, 66, 8, 2302);
    			attr_dev(div4, "class", "feature-discription svelte-19qg85v");
    			add_location(div4, file, 63, 6, 2158);
    			if (!src_url_equal(img2.src, img2_src_value = "/sylph-dnd.png")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "feature screenshot");
    			attr_dev(img2, "class", "svelte-19qg85v");
    			add_location(img2, file, 75, 8, 2740);
    			attr_dev(div5, "class", "feature-img svelte-19qg85v");
    			add_location(div5, file, 74, 6, 2706);
    			attr_dev(div6, "class", "feature svelte-19qg85v");
    			add_location(div6, file, 62, 4, 2130);
    			if (!src_url_equal(img3.src, img3_src_value = "/sylph-preview.png")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "alt", "feature screenshot");
    			attr_dev(img3, "class", "svelte-19qg85v");
    			add_location(img3, file, 80, 8, 2884);
    			attr_dev(div7, "class", "feature-img svelte-19qg85v");
    			add_location(div7, file, 79, 6, 2850);
    			attr_dev(path0, "d", "M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z");
    			add_location(path0, file, 92, 10, 3242);
    			attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg0, "width", "7em");
    			attr_dev(svg0, "height", "7em");
    			attr_dev(svg0, "fill", "currentColor");
    			attr_dev(svg0, "class", "bi bi-code-slash");
    			attr_dev(svg0, "viewBox", "0 0 16 16");
    			attr_dev(svg0, "color", "whitesmoke");
    			add_location(svg0, file, 83, 8, 3003);
    			attr_dev(h22, "class", "svelte-19qg85v");
    			add_location(h22, file, 96, 8, 3613);
    			add_location(em3, file, 98, 18, 3666);
    			add_location(strong3, file, 98, 10, 3658);
    			attr_dev(p5, "class", "svelte-19qg85v");
    			add_location(p5, file, 97, 8, 3644);
    			attr_dev(div8, "class", "feature-discription svelte-19qg85v");
    			add_location(div8, file, 82, 6, 2961);
    			attr_dev(div9, "class", "feature svelte-19qg85v");
    			add_location(div9, file, 78, 4, 2822);
    			attr_dev(path1, "d", "M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z");
    			add_location(path1, file, 115, 10, 4242);
    			attr_dev(path2, "d", "M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z");
    			add_location(path2, file, 118, 10, 4477);
    			attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg1, "width", "7em");
    			attr_dev(svg1, "height", "7em");
    			attr_dev(svg1, "fill", "currentColor");
    			attr_dev(svg1, "class", "bi bi-card-checklist");
    			attr_dev(svg1, "viewBox", "0 0 16 16");
    			attr_dev(svg1, "color", "whitesmoke");
    			add_location(svg1, file, 106, 8, 3999);
    			attr_dev(h23, "class", "svelte-19qg85v");
    			add_location(h23, file, 122, 8, 4908);
    			add_location(em4, file, 124, 18, 4965);
    			add_location(strong4, file, 124, 10, 4957);
    			attr_dev(p6, "class", "svelte-19qg85v");
    			add_location(p6, file, 123, 8, 4943);
    			attr_dev(div10, "class", "feature-discription svelte-19qg85v");
    			add_location(div10, file, 105, 6, 3957);
    			if (!src_url_equal(img4.src, img4_src_value = "/sylph-projects.png")) attr_dev(img4, "src", img4_src_value);
    			attr_dev(img4, "alt", "feature screenshot");
    			attr_dev(img4, "class", "svelte-19qg85v");
    			add_location(img4, file, 131, 8, 5330);
    			attr_dev(div11, "class", "feature-img svelte-19qg85v");
    			add_location(div11, file, 130, 6, 5296);
    			attr_dev(div12, "class", "feature svelte-19qg85v");
    			add_location(div12, file, 104, 4, 3929);
    			attr_dev(section2, "class", "features");
    			add_location(section2, file, 61, 2, 2099);
    			attr_dev(h12, "class", "svelte-19qg85v");
    			add_location(h12, file, 138, 6, 5488);
    			add_location(div13, file, 137, 4, 5476);
    			attr_dev(path3, "d", "M6.555 1.375 0 2.237v5.45h6.555V1.375zM0 13.795l6.555.933V8.313H0v5.482zm7.278-5.4.026 6.378L16 16V8.395H7.278zM16 0 7.33 1.244v6.414H16V0z");
    			add_location(path3, file, 151, 10, 5825);
    			attr_dev(svg2, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg2, "width", "6em");
    			attr_dev(svg2, "height", "6em");
    			attr_dev(svg2, "fill", "currentColor");
    			attr_dev(svg2, "class", "bi bi-windows svelte-19qg85v");
    			attr_dev(svg2, "viewBox", "0 0 16 16");
    			attr_dev(svg2, "color", "#714c8e");
    			add_location(svg2, file, 142, 8, 5592);
    			attr_dev(form1, "action", "https://github.com/oslabs-beta/Sylph/releases/download/v1.0.0-beta/Sylph.Setup.1.0.0.exe");
    			attr_dev(form1, "method", "get");
    			attr_dev(form1, "target", "_blank");
    			attr_dev(form1, "class", "DL-form svelte-19qg85v");
    			add_location(form1, file, 155, 8, 6023);
    			attr_dev(div14, "class", "app-version svelte-19qg85v");
    			add_location(div14, file, 141, 6, 5558);
    			attr_dev(path4, "d", "M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z");
    			add_location(path4, file, 174, 10, 6570);
    			attr_dev(path5, "d", "M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z");
    			add_location(path5, file, 177, 10, 7315);
    			attr_dev(svg3, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg3, "width", "6em");
    			attr_dev(svg3, "height", "6em");
    			attr_dev(svg3, "fill", "currentColor");
    			attr_dev(svg3, "class", "bi bi-apple svelte-19qg85v");
    			attr_dev(svg3, "viewBox", "0 0 16 16");
    			attr_dev(svg3, "color", "#714c8e");
    			add_location(svg3, file, 165, 8, 6339);
    			attr_dev(form2, "action", "https://github.com/oslabs-beta/Sylph/releases/download/v1.0.0-Beta-Mac/Sylph-1.0.0.dmg");
    			attr_dev(form2, "method", "get");
    			attr_dev(form2, "target", "_blank");
    			attr_dev(form2, "class", "DL-form svelte-19qg85v");
    			add_location(form2, file, 181, 8, 8073);
    			attr_dev(div15, "class", "app-version svelte-19qg85v");
    			add_location(div15, file, 164, 6, 6305);
    			attr_dev(div16, "class", "app-option svelte-19qg85v");
    			add_location(div16, file, 140, 4, 5527);
    			attr_dev(section3, "class", "download svelte-19qg85v");
    			attr_dev(section3, "name", "download");
    			add_location(section3, file, 136, 2, 5429);
    			attr_dev(h13, "class", "svelte-19qg85v");
    			add_location(h13, file, 193, 4, 8406);
    			attr_dev(div17, "class", "devs svelte-19qg85v");
    			add_location(div17, file, 194, 4, 8438);
    			attr_dev(section4, "class", "dev-section svelte-19qg85v");
    			add_location(section4, file, 192, 2, 8372);
    			attr_dev(container, "class", "main-container svelte-19qg85v");
    			add_location(container, file, 16, 0, 458);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			mount_component(header, target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, container, anchor);
    			append_dev(container, section0);
    			append_dev(section0, div0);
    			append_dev(div0, h20);
    			append_dev(div0, t3);
    			append_dev(div0, h10);
    			append_dev(div0, t5);
    			append_dev(div0, p0);
    			append_dev(div0, t7);
    			append_dev(div0, p1);
    			append_dev(div0, t9);
    			append_dev(div0, form0);
    			mount_component(downloadbtndynamic0, form0, null);
    			append_dev(section0, t10);
    			append_dev(section0, div1);
    			append_dev(div1, img0);
    			append_dev(container, t11);
    			append_dev(container, section1);
    			append_dev(section1, div2);
    			append_dev(div2, h11);
    			append_dev(section1, t13);
    			append_dev(section1, div3);
    			append_dev(div3, p2);
    			append_dev(p2, strong0);
    			append_dev(strong0, em0);
    			append_dev(p2, t15);
    			append_dev(div3, t16);
    			append_dev(div3, p3);
    			append_dev(p3, t17);
    			append_dev(p3, strong1);
    			append_dev(strong1, em1);
    			append_dev(p3, t19);
    			append_dev(container, t20);
    			append_dev(container, section2);
    			append_dev(section2, div6);
    			append_dev(div6, div4);
    			append_dev(div4, img1);
    			append_dev(div4, t21);
    			append_dev(div4, h21);
    			append_dev(div4, t23);
    			append_dev(div4, p4);
    			append_dev(p4, strong2);
    			append_dev(strong2, em2);
    			append_dev(p4, t25);
    			append_dev(div6, t26);
    			append_dev(div6, div5);
    			append_dev(div5, img2);
    			append_dev(section2, t27);
    			append_dev(section2, div9);
    			append_dev(div9, div7);
    			append_dev(div7, img3);
    			append_dev(div9, t28);
    			append_dev(div9, div8);
    			append_dev(div8, svg0);
    			append_dev(svg0, path0);
    			append_dev(div8, t29);
    			append_dev(div8, h22);
    			append_dev(div8, t31);
    			append_dev(div8, p5);
    			append_dev(p5, strong3);
    			append_dev(strong3, em3);
    			append_dev(p5, t33);
    			append_dev(section2, t34);
    			append_dev(section2, div12);
    			append_dev(div12, div10);
    			append_dev(div10, svg1);
    			append_dev(svg1, path1);
    			append_dev(svg1, path2);
    			append_dev(div10, t35);
    			append_dev(div10, h23);
    			append_dev(div10, t37);
    			append_dev(div10, p6);
    			append_dev(p6, strong4);
    			append_dev(strong4, em4);
    			append_dev(p6, t39);
    			append_dev(div12, t40);
    			append_dev(div12, div11);
    			append_dev(div11, img4);
    			append_dev(container, t41);
    			append_dev(container, section3);
    			append_dev(section3, div13);
    			append_dev(div13, h12);
    			append_dev(section3, t43);
    			append_dev(section3, div16);
    			append_dev(div16, div14);
    			append_dev(div14, svg2);
    			append_dev(svg2, path3);
    			append_dev(div14, t44);
    			append_dev(div14, form1);
    			mount_component(downloadbtndynamic1, form1, null);
    			append_dev(div16, t45);
    			append_dev(div16, div15);
    			append_dev(div15, svg3);
    			append_dev(svg3, path4);
    			append_dev(svg3, path5);
    			append_dev(div15, t46);
    			append_dev(div15, form2);
    			mount_component(downloadbtndynamic2, form2, null);
    			append_dev(container, t47);
    			append_dev(container, section4);
    			append_dev(section4, h13);
    			append_dev(section4, t49);
    			append_dev(section4, div17);
    			mount_component(contributorblock0, div17, null);
    			append_dev(div17, t50);
    			mount_component(contributorblock1, div17, null);
    			append_dev(div17, t51);
    			mount_component(contributorblock2, div17, null);
    			append_dev(div17, t52);
    			mount_component(contributorblock3, div17, null);
    			append_dev(container, t53);
    			mount_component(footer, container, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(downloadbtndynamic0.$$.fragment, local);
    			transition_in(downloadbtndynamic1.$$.fragment, local);
    			transition_in(downloadbtndynamic2.$$.fragment, local);
    			transition_in(contributorblock0.$$.fragment, local);
    			transition_in(contributorblock1.$$.fragment, local);
    			transition_in(contributorblock2.$$.fragment, local);
    			transition_in(contributorblock3.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(downloadbtndynamic0.$$.fragment, local);
    			transition_out(downloadbtndynamic1.$$.fragment, local);
    			transition_out(downloadbtndynamic2.$$.fragment, local);
    			transition_out(contributorblock0.$$.fragment, local);
    			transition_out(contributorblock1.$$.fragment, local);
    			transition_out(contributorblock2.$$.fragment, local);
    			transition_out(contributorblock3.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(container);
    			destroy_component(downloadbtndynamic0);
    			destroy_component(downloadbtndynamic1);
    			destroy_component(downloadbtndynamic2);
    			destroy_component(contributorblock0);
    			destroy_component(contributorblock1);
    			destroy_component(contributorblock2);
    			destroy_component(contributorblock3);
    			destroy_component(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const prerender = true;

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		prerender,
    		ContributorBlock,
    		Header,
    		Footer,
    		DownloadBtnDynamic,
    		OS,
    		sylphVersion
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
