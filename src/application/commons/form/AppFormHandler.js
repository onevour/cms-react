class AppFormHandler {

    constructor(component, props) {
        this.component = component
        this.props = props
    }

    isUpdate(props, key) {
        return (this.component.props[key] !== this.props[key])
    }

}

export default AppFormHandler