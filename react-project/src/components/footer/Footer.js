import React from 'react';
import './Footer.css';

function Footer() {
    return(
        <div className="footer">
            <div className="footer-wrapper">
                <div className="footer-nav tp ft-flex">
                    <div className="col-1 col-ft tp col-ft-se">
                        <h2 className="ch-ft tp">
                            Product
                        </h2>
                        <ul className="ul-ft tp ft-flex">
                            <li className="pos-1 item tp">
                                Features
                            </li>
                            <li className="pos-2 item tp">
                                Security
                            </li>
                            <li className="pos-3 item tp">
                                Pricing
                            </li>
                            <li className="pos-4 item tp">
                                Resources
                            </li>
                        </ul>
                    </div>
                    <div className="col-2 col-ft tp col-ft-se">
                        <h2 className="ch-ft tp">
                            Support
                        </h2>
                        <ul className="ul-ft tp ft-flex">
                            <li className="pos-1 item tp">
                                Test1
                            </li>
                            <li className="pos-2 item tp">
                                Test2
                            </li>
                            <li className="pos-3 item tp">
                                Test3
                            </li>
                        </ul>
                    </div>
                    <div className="col-3 col-ft tp col-ft-se">
                        <h2 className="ch-ft tp">
                            Company
                        </h2>
                        <ul className="ul-ft tp ft-flex">
                            <li className="pos-1 item tp">
                                Test1
                            </li>
                            <li className="pos-2 item tp">
                                Test2
                            </li>
                            <li className="pos-3 item tp">
                                Test3
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-b tp ft-flex">
                    <h1 className="ft-bottom-item">
                        © 2022 Test, Inc.
                    </h1>
                    <h1 className="ft-bottom-item">
                        Terms
                    </h1>
                    <h1 className="ft-bottom-item">
                        Privacy
                    </h1>
                    <h1 className="ft-bottom-item">
                        About
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Footer;