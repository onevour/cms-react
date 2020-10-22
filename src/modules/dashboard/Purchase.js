import React, {Component} from "react";

class Purchase extends Component {

    render() {
        return (
            <div className="row purchace-popup">
                <div className="col-12">
              <span className="d-flex alifn-items-center">
                <p>Like what you see? Check out our premium version for more.</p>
                <a href="https://github.com/BootstrapDash/StarAdmin-Free-Bootstrap-Admin-Template" target="_blank"
                   className="btn ml-auto download-button">Download Free Version</a>
                <a href="https://www.bootstrapdash.com/product/star-admin-pro/" target="_blank"
                   className="btn purchase-button">Upgrade To Pro</a>
                <i className="mdi mdi-close popup-dismiss"></i>
              </span>
                </div>
            </div>


        );
    }
}

export default Purchase;