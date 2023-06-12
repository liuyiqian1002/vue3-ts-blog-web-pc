import { forEach, debounce } from 'lodash'

export function setupGlobDirectives (app) {
    app.directive('loadMore', {
        mounted (el, binding) {
// bind只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
            let SELECTWRAP_DOM = ''
            SELECTWRAP_DOM = document.querySelectorAll(
                `.${binding.instance.item.key} .el-select-dropdown__wrap`,
            )
            if (SELECTWRAP_DOM) {
                forEach(SELECTWRAP_DOM, (oneData) => {
                    oneData.addEventListener('scroll', function () {
                        // 判断滚动到底部
                        const CONDITION = this.scrollHeight - this.scrollTop <=
                            this.clientHeight + 1
                        if (CONDITION) {
                            // binding.value 是指令的绑定值，该值可能是字符串，数字、函数
                            // binding.value() 表示执行 v-loadmore 绑定的函数
                            //     debounce(()=>binding.value(), 200)
                            binding.value()
                        }
                    })
                })
            }
//             const fun = debounce(() => {
//                 binding.value();
//             }, 1000);
            // const SELECTWRAP_DOM = el.querySelectorAll('.el-select-dropdown__wrap');
            // console.log(SELECTWRAP_DOM)
            // SELECTWRAP_DOM.addEventListener('scroll', function () {
            //     /**
            //      * scrollHeight 获取元素内容高度(只读)
            //      * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
            //      * clientHeight 读取元素的可见高度(只读)
            //      * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
            //      * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
            //      */
            //     const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
            //     if (condition) {
            //         binding.value();
            //     }
            // });
        },
    })
}

export function getSelectVal (app) {
    app.directive('selectVal', {
        mounted (el, binding) {
            if (binding.instance.formAll) {
                let obj = binding.instance.formAll[binding.value.key]
                for (let i = 0; i < obj.length; i++) {
                    if (obj[i].dictValue == binding.value.val) {
                        return el.innerHTML = obj[i].dictLabel
                    }
                }
                
            } else {
                this.$message.warning('请检查全局枚举对象formAll对象！')
            }
        },
    })
}
