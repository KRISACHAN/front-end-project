import { ref, reactive, computed } from "vue";
import useStorage from './use-storage';

export default function useTodos() {
    let showModal = ref(false)
    let title = ref("");
    let todos = useStorage('todos',[])
    function addTodo() {
        if(!title.value){
            showModal.value = true;
            setTimeout(()=>{
                showModal.value = false;
            },1500);
            return;
        }
        todos.value.push({
            title: title.value,
            done: false,
        });
        title.value = "";
    }
    function clear() {
        todos.value = todos.value.filter((v) => !v.done);
    }
    let active = computed(() => {
        return todos.value.filter((v) => !v.done).length;
    });
    let all = computed(() => todos.value.length);
    let allDone = computed({
        get: function () {
            return active.value === 0;
        },
        set: function (value) {
            todos.value.forEach((todo) => {
                todo.done = value;
            });
        },
    });
    let animate = reactive({
        show:false,
        el:null
      })
      function beforeEnter(el){
            let dom = animate.el
            let rect = dom.getBoundingClientRect()
            let x = window.innerWidth - rect.left - 60
            let y = rect.top - 10
            el.style.transform = `translate(-${x}px, ${y}px)`
      }
      function enter(el,done){
            document.body.offsetHeight
            el.style.transform = `translate(0,0)`
            el.addEventListener('transitionend', done)
      }
      function afterEnter(el){
            animate.show = false
            el.style.display = 'none'
      }
    function removeTodo(e,i){
        animate.el = e.target
        animate.show = true
        todos.value.splice(i,1)
      }
    return {
        title,
        todos,
        addTodo,
        clear,
        active,
        all,
        allDone,
        showModal,
        removeTodo,
        animate,
        beforeEnter,
        enter,
        afterEnter,
    };
}