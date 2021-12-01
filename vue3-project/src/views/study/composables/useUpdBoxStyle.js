import { ref } from 'vue'

// const [el, domHandle] = useUpdBoxStyle()
export default function useUpdBoxStyle() {
  const el = ref(null)
  const updateStyle = color => {
    el.value.style.color = color
  }
  return [el, updateStyle]
}
