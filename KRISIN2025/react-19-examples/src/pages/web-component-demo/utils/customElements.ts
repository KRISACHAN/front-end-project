type CustomElementConfig = {
    props?: string[]
    template: string
    observedAttributes?: string[]
    init?: (element: HTMLElement) => void
  }

  export function defineCustomElement(
    name: string,
    config: CustomElementConfig
  ) {
    if (customElements.get(name)) {
      return
    }

    class CustomElement extends HTMLElement {
      shadow: ShadowRoot

      constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
        this.shadow.innerHTML = config.template
      }

      static get observedAttributes() {
        return config.observedAttributes || []
      }

      connectedCallback() {
        config.init?.(this)
      }

      attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string
      ) {
        if (oldValue !== newValue) {
          this[name as keyof this] = newValue
        }
      }
    }

    // 添加属性定义
    if (config.props) {
      config.props.forEach(prop => {
        Object.defineProperty(CustomElement.prototype, prop, {
          get() {
            return this.getAttribute(prop)
          },
          set(value) {
            if (value === null || value === undefined) {
              this.removeAttribute(prop)
            } else {
              this.setAttribute(prop, value)
            }
          }
        })
      })
    }

    customElements.define(name, CustomElement)
  }
