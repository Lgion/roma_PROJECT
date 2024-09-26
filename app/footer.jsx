'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef, useContext } from 'react'
// import {NavbarsBtnHambergur,DropBox} from "./components/B5Elements"


export default ({ children }) => <footer className='footer'>
    <a href="#">Bottom navbar</a>
    {/* <NavbarsBtnHambergur className="footer__hamburgerBtn" /> */}
    <ul className='footer__nav'>
        {
            ["Home", "Link", "Disabled"]
                .map((item, i) => <li key={"footer__nav__"+i}>
                    <a className={i == 0 ? "active" : ""} aria-current="page" href="#">{item}</a>
                    {/* <a className="disabled">Disabled</a> */}
                </li>
                )
        }
        <li className="dropup">
            {/* <DropBox /> */}
        </li>
    </ul>
</footer>




