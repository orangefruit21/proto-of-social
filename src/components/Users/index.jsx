import React, {useEffect, useState} from "react";
import s from "./Users.module.css";
import User from "./User";
import {ReactComponent as Loader} from "../../assets/svg/loader.svg";
import axios from "axios";


const Users = ({usersList, onSwitchFollow, setUsers, removeUsers}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [maxPage, setMaxPage] = useState(0);
    const [countOfUsers] = useState(9);

    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${countOfUsers}&page=1`, {
            withCredentials: true,
        })
            .then(res => {
                setUsers(res.data.items);
                let newMaxPage = Math.ceil(res.data.totalCount / countOfUsers);
                setMaxPage(newMaxPage);
            });
        return () => {
            removeUsers();
        };
    }, [setUsers, removeUsers, countOfUsers]);

    const loadNewPortion = () => {
        let pageNumber = usersList.length / countOfUsers + 1;
        if (pageNumber <= maxPage) {
            setIsLoading(true);
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${countOfUsers}&page=${pageNumber}`, {
                withCredentials: true,
            })
                .then(res => {
                    setUsers(res.data.items);
                    setIsLoading(false);
                });
        }
    };

    const scrollHandler = (event) => {
        let scrollPosition = event.target.scrollTop;
        let scrollMax = event.target.scrollHeight;
        let height = event.target.offsetHeight;
        if (scrollPosition >= scrollMax-height) {
            loadNewPortion();
        }
    };

    if (usersList.length === 0) {
        return (
            <main className={s.wrapper}>
                <ul className={s.list}>
                    <Loader/>
                </ul>
            </main>
        );
    } else {
        return (
            <main className={s.wrapper}>
                <ul className={s.list} onScroll={(event) => {
                    !isLoading && scrollHandler(event);
                }}>
                    {usersList.map(user => <User key={user.id} userData={user} onSwitchFollow={onSwitchFollow}/>)}
                    {isLoading && <Loader style={{width: 80, height: 50}}/>}
                </ul>
            </main>
        );
    }
};

export default Users;