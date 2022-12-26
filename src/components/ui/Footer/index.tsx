import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => (
    <div className="footer">
        <div className="footer__container">
            <h3>
                GOT JOKES? GET PAID
                <br />
                FOR SUBMITTTING!
            </h3>
            <a href="#">
                <span>SEE STATS</span>
                <i className="icon-full-right-arrow" />
            </a>
        </div>
    </div>
);

export default Footer;
