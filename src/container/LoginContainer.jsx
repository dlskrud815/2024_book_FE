import React, { useState, useRef } from "react";
import Login from "../components/login/Login";
import { isLoginTrue } from "../modules/api/account";
import { useNavigate } from "react-router-dom";

export default function LoginContainer(props) {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [remember, setRemember] = useState(false);
  const [notice, setNotice] = useState(0);

  const navigate = useNavigate()

  const emailInputRef = useRef(null);
  const emailInputFocus = () => {
    emailInputRef.current.focus();
  };
  const pwInputRef = useRef(null);
  const pwInputFocus = () => {
    pwInputRef.current.focus();
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("hihihi");

    if (email === "") {
      setNotice(2);
      emailInputFocus();
    } else if (pw === "") {
      setNotice(1);
      pwInputFocus();
    } else {
      //로그인 api 함수 호출
      console.log(
        `email:${email}, pw:${pw}, remember:${remember} 로그인 되었습니다.`
      );
      let res = isLoginTrue(email,pw)
      if (res) {
        setNotice(0);
        navigate("/")
      } else {
        setNotice(3);
        emailInputFocus();
      }
    }
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPwChange = (e) => {
    setPw(e.target.value);
  };

  const onEmailCancleHandler = (e) => {
    setEmail("");
    emailInputFocus();
  };

  const onPwCancleHandler = (e) => {
    setPw("");
    pwInputFocus();
    //console.log("pw_init",pw);
  };

  const onClickPwSearchBtn = (e)=>{
    props.setState("passwordsearch")
    console.log("onClickPwSearchBtn")
  }

  const onClickSignupBtn = (e)=>{
    props.setState("signup")
    console.log("onClickSignupBtns")
  }

  return (
    <Login
      onSubmitHandler={onSubmitHandler}
      onEmailChange={onEmailChange}
      onPwChange={onPwChange}
      onEmailCancleHandler={onEmailCancleHandler}
      onPwCancleHandler={onPwCancleHandler}
      notice={notice}
      pw={pw}
      email={email}
      emailInputRef={emailInputRef}
      emailInputFocus={emailInputFocus}
      pwInputRef={pwInputRef}
      pwInputFocus={pwInputFocus}
      onClickPwSearchBtn={onClickPwSearchBtn}
      onClickSignupBtn={onClickSignupBtn}
    />
  );
}

//props.onPwCancleHandler
