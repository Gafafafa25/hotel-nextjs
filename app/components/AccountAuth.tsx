"use client"

import {useState} from "react";
import AccountLoginForm from "@/app/components/AccountLoginForm";
import AccountRegisterForm from "@/app/components/AccountRegisterForm";

export default function AccountAuth() {
    // const [login, setLogin] = useState(true)
    const [showLoginForm, setShowLoginForm] = useState(true)
    const [showRegisterForm, setShowRegisterForm] = useState(false)

    return(
        <div className="flex-col items-center justify-between bg-white">
            {/*<button*/}
            {/*    type="button"*/}
            {/*    onClick={() => {*/}
            {/*        setShowLoginForm(!showLoginForm)*/}
            {/*        setShowRegisterForm(false)*/}
            {/*    }}>Login*/}
            {/*</button>*/}
            <button
                type="button"
                className=" text-sm font-medium text-center transition-all duration-200"
                onClick={() => {
                    setShowRegisterForm(!showRegisterForm)
                    setShowLoginForm(false)
                }}>Register
            </button>
            <div>
                {showLoginForm ? <AccountLoginForm/> : <AccountRegisterForm/>}
            </div>
        </div>

    )
}