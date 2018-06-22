<template>
    <li :class="[prefixCls + '-item-group']">
        <div :class="[prefixCls + '-item-group-title']" :style="groupStyle">{{ title }}</div>
        <ul><slot></slot></ul>
    </li>
</template>
<script>
    import mixin from '~utils/iview/mixin';
    const prefixCls = 'ivu-menu';

    export default {
        name: 'IviewMenuGroup',
        mixins: [ mixin ],
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                prefixCls: prefixCls
            };
        },
        computed: {
            groupStyle () {
                return this.hasParentSubmenu && this.mode !== 'horizontal' ? {
                    paddingLeft: 43 + (this.parentSubmenuNum - 1) * 28 + 'px'
                } : {};
            }
        }
    };
</script>