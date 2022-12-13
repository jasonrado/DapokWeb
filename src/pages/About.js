import React from "react";
import { Link } from 'react-router-dom'


export default function About() {

   
    return (
        <React.Fragment>
            <div className="overlay"></div>
       

            <div className="header style--two">
                <div className="header-bottom">
                    <div className="header-bottom-area align-items-center">
                        <div className="logo"><Link to="/"><img src="assets/images/logo.png" alt="logo" /></Link></div>
                        <ul className="menu">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/faq">FAQ</Link>
                            </li>
                        </ul>
                        <div className="header-trigger-wrapper d-flex d-lg-none align-items-center">
                            <div className="header-trigger">
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="banner-section bg_img"
                style={{
                    background: 'url(assets/images/thumb/banner.png)'
                }}>
                <div className="container">
                    <div className="banner-content">
                        <h5 style={{
                            fontFamily: 'ahsing',
                            fontSize: '80px',
                            margin: '0',
                            fontWeight: '700',
                            lineHeight: '1.3'
                        }}
                        className="title text--warning mb-4 pb-2" >DAPOK</h5>
                        <p className="fw-semibold fs--20px text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                    </div>
                </div>
            </div>



            <div className="about-section bg-white pt-100 pb-80" id="about">
                <div className="container">
                    <div className="row gy-5">
                        <div className="col-lg-6">
                            <div className="about-content">
                                <h2 className="section-title">Project Dapok</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                <a href="#!" className="btn btn--sm rounded-0 btn--accent px-5 mt-4"
                                    style={{
                                        minWidth: 'unset'
                                    }}>See Less</a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src="assets/images/thumb/about.png" alt="thumb" className="mw-100" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="about-section bg-white pt-100 pb-80 border-top border-primary">
                <div className="container">
                    <div className="row gy-5 justify-content-between">
                        <div className="col-lg-6">
                            <div className="about-content">
                                <h2 className="section-title">The Name “Dapok”</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                <a href="#!" className="btn btn--sm rounded-0 btn--accent px-5 mt-4"
                                    style={{
                                        minWidth: 'unset'
                                    }}>Learn More</a>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <img src="assets/images/thumb/about2.png" alt="thumb" className="mw-100" />
                        </div>
                    </div>
                </div>
            </div>




            <div className="team-section pt-5 pb-80">
                <div className="team-bg">
                    <img src="assets/images/thumb/team-bg.png" alt="thumb" />
                </div>
                <div className="container">
                    <h2 className="section-title text-center text-white">Our Team</h2>
                    <div className="row gy-4">
                        <div className="col-lg-4 col-xl-3 col-md-6 col-sm-6">
                            <div className="team-item">
                                <div className="team-item__thumb">
                                    <img src="assets/images/thumb/jann-pic.jpg" alt="thumb" />
                                </div>
                                <div className="team-item__content">
                                    <h3 className="team-item__content-name text--base">Jann Orine</h3>
                                    <h5 className="designation text--base">Project Manager</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-3 col-md-6 col-sm-6">
                            <div className="team-item">
                                <div className="team-item__thumb">
                                    <img src="assets/images/thumb/jeffrey-pic.jpg" alt="thumb" />
                                </div>
                                <div className="team-item__content">
                                    <h3 className="team-item__content-name text--base">Jeffrey Lasat</h3>
                                    <h5 className="designation text--base">Document Specialist</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-3 col-md-6 col-sm-6">
                            <div className="team-item">
                                <div className="team-item__thumb">
                                    <img src="assets/images/thumb/rado-pic.png" alt="thumb" />
                                </div>
                                <div className="team-item__content">
                                    <h3 className="team-item__content-name text--base">Jason Rado</h3>
                                    <h5 className="designation text--base">Web App Developer</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-3 col-md-6 col-sm-6">
                            <div className="team-item">
                                <div className="team-item__thumb">
                                    <img src="assets/images/thumb/doreen-pic.jpg" alt="thumb" />
                                </div>
                                <div className="team-item__content">
                                    <h3 className="team-item__content-name text--base">Doreen Pandi</h3>
                                    <h5 className="designation text--base">Mobile App Developer</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="contact-section pt-60 pb-80">
                <div className="contact-bg">
                    <img src="assets/images/thumb/team-bg.png" alt="thumb" />
                </div>
                <div className="container">
                    <h2 className="section-title mb-1 text-center text-white">Contact Us</h2>
                    <p className="contact-title-text  text-center text-white pb-60">If you have any questions about the project, You can contact us:</p>
                    <div className="row gy-4 justify-content-evenly">
                        <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 mb-5 mb-sm-0">
                            <div className="contact-item">
                                <div className="contact-item__icon">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div className="contact-item__content">
                                    <h5 className="contact-item__content-title">Email Us</h5>
                                    <a href="mailto:dapok@uic.edu.ph" className="text-decoration-underline">dapok@uic.edu.ph</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6">
                            <div className="contact-item">
                                <div className="contact-item__icon">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div className="contact-item__content">
                                    <h5 className="contact-item__content-title">Visit Us</h5>
                                    <p className="mb-0">University of the Immaculate Conception. Father Selga St., Davao City</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <script src="assets/js/lib/jquery-3.6.0.min.js"></script>
            <script src="assets/js/lib/bootstrap.min.js"></script>
            <script src="assets/js/lib/slick.min.js"></script>
            <script src="assets/js/main.js"></script>
        </React.Fragment>
    )
}