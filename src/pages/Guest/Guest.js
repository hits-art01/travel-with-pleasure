import style from './Guest.module.css'
import flex  from '../../components/Template/Template.module.css'
import image from '../../components/assets/Flying kite_Monochromatic 1.svg'
import DescriptionGuest from "../../components/Description/DescriptionGuest";
import {usernameField} from "../../components/FormInputs/FormInputs";
import {useState} from "react";
import Head from "../../components/Head/Head";
import {guestSignUp} from "../../components/server/Guest";
import {useNavigate} from "react-router-dom";

const Guest = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState('')

     const usernameValid = new RegExp(usernameField.pattern).test(input)

    const handleInputChange = (e) => {
        setInput(e.target.value)
    }

    const handleGuestLogin = () => {
        guestSignUp(input)
        navigate('/')
    }

    return  (
        <>
            <Head burger={false} search={false}/>
            <form className={`${style.wrapper} ${flex.centered_column}`}>
            <img src={image} className={style.image}/>
            <p className={style.input_header}>Your Nickname</p>
            <input
                placeholder={usernameField.placeholder}
                type={usernameField.type}
                className={`${style.input} ${input.length > 0 && !usernameValid ? style.error : ''}`}
                value={input}
                onChange={handleInputChange}
            />
            {
                input.length > 0 && !usernameValid &&
                    (<p className={style.message}>{usernameField.errorMessage}</p>)
            }
            <button className={`${style.button} ${flex.centered_column}`} onClick={handleGuestLogin}>Go to Chat</button>
            <DescriptionGuest/>
        </form>
        </>
    )
}

export default Guest