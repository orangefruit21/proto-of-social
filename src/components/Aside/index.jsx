import React from "react";
import s from "./Aside.module.css";

export default function Index() {
    return (
        <aside className={s.aside}>
            <nav>
                <ul>
                    <li><a href="/#">Profile</a></li>
                    <li><a href="/#">Messages</a></li>
                    <li><a href="/#">News</a></li>
                    <li><a href="/#">Music</a></li>
                    <li><a href="/#">Settings</a></li>
                </ul>
            </nav>
        </aside>
    );
}