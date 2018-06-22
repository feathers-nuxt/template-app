import { findComponentUpward, findComponentsUpward } from '~utils/iview/assist';
export default {
    data () {
        return {
            menu: findComponentUpward(this, 'IviewMenu')
        };
    },
    computed: {
        hasParentSubmenu () {
            return !!findComponentUpward(this, 'Submenu');
        },
        parentSubmenuNum () {
            return findComponentsUpward(this, 'Submenu').length;
        },
        mode () {
            return this.menu.mode;
        }
    }
};