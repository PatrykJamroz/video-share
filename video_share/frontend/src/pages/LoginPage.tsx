import * as React from "react";

export function LoginPage(){
    return (<div>
                <form>
                    <input type="text" name="username" placeholder="enter username"/>
                    <input type="password" name="password" placeholder="enter password"/>
                    <input type="submit"/>
                </form>
            </div>)
}