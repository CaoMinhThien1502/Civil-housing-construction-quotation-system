import React from "react";
import './service.css';
class Service extends React.Component {
    render() {
        return(
            <div class="container">
    <div class="row">
        <div class="col-md-3 col-sm-6">
            <div class="serviceBox">
                <div class="service-icon">
                    <span><i class="fa fa-globe"></i></span>
                </div>
                <h3 class="title">Web Design</h3>
                <p class="description">Lorem ipsum dolor sit amet conse ctetur adipisicing elit. Qui quaerat fugit quas veniam perferendis repudiandae sequi, dolore quisquam illum.</p>
            </div>
        </div>
        <div class="col-md-3 col-sm-6">
            <div class="serviceBox red">
                <div class="service-icon">
                    <span><i class="fa fa-rocket"></i></span>
                </div>
                <h3 class="title">Web Development</h3>
                <p class="description">Lorem ipsum dolor sit amet conse ctetur adipisicing elit. Qui quaerat fugit quas veniam perferendis repudiandae sequi, dolore quisquam illum.</p>
            </div>
        </div>
    </div>
</div>
        );
    }
}
export default Service;