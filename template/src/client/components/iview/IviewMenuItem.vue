<template>
    <li :class="classes" @click.stop="handleClick" :style="itemStyle"><slot></slot></li>
</template>
<script>
    import Emitter from '~utils/iview/emitter';
    import { findComponentUpward } from '~utils/iview/assist';
    const prefixCls = 'ivu-menu';
    import mixin from '~utils/iview/mixin';

    export default {
        name: 'IviewMenuItem',
        mixins: [ Emitter, mixin ],
        props: {
            name: {
                type: [String, Number],
                required: true
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                active: false
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}-item`,
                    {
                        [`${prefixCls}-item-active`]: this.active,
                        [`${prefixCls}-item-selected`]: this.active,
                        [`${prefixCls}-item-disabled`]: this.disabled
                    }
                ];
            },
            itemStyle () {
                return this.hasParentSubmenu && this.mode !== 'horizontal' ? {
                    paddingLeft: 43 + (this.parentSubmenuNum - 1) * 24 + 'px'
                } : {};
            }
        },
        methods: {
            handleClick () {
                if (this.disabled) return;

                let parent = findComponentUpward(this, 'IviewSubmenu');

                if (parent) {
                    this.dispatch('IviewSubmenu', 'on-menu-item-select', this.name);
                } else {
                    this.dispatch('IviewMenu', 'on-menu-item-select', this.name);
                }
            }
        },
        mounted () {
            this.$on('on-update-active-name', (name) => {
                if (this.name === name) {
                    this.active = true;
                    this.dispatch('IviewSubmenu', 'on-update-active-name', name);
                } else {
                    this.active = false;
                }
            });
        }
    };
</script>