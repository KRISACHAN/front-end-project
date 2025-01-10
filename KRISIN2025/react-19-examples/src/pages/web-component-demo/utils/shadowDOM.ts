type ShadowComponentConfig = {
    template: string
    styles?: string
    init?: (element: HTMLElement) => void
  }

  export function createShadowComponent(
    name: string,
    config: ShadowComponentConfig
  ) {
    if (customElements.get(name)) {
      return customElements.get(name)!
    }

    class ShadowComponent extends HTMLElement {
      shadow: ShadowRoot

      constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })

        // 添加模板
        const template = document.createElement('template')
        template.innerHTML = config.template

        // 克隆模板并添加到 shadow root
        this.shadow.appendChild(template.content.cloneNode(true))

        // 添加额外样式
        if (config.styles) {
          const style = document.createElement('style')
          style.textContent = config.styles
          this.shadow.appendChild(style)
        }
      }

      connectedCallback() {
        config.init?.(this)
      }

      // 提供更新主题的方法
      updateTheme(theme: Record<string, string>) {
        Object.entries(theme).forEach(([property, value]) => {
          this.style.setProperty(`--${property}`, value)
        })
      }
    }

    customElements.define(name, ShadowComponent)
    return ShadowComponent
  }
