import { createContext, useState } from "react";

const ModelContext = createContext({
    currentOpenModel: '', // 'modal', 'OTP', 'modelChangePass'
    currentCloseModel: '',
    openModel: () => { },
    closeModel: () => { },
    openOTP: () => { },
    closeOPT: () => { },
    openModelChangePass: () => { },
    closeModelChangePass: () => { },
    clearCloseModel: () => { },
});

export function ModelContextProvider({ children }) {
    const [currentOpenStateModel, setCurrentOpenStateModel] = useState('');
    const [currentCloseStateModel, setCurrentCloseStateModel] = useState('');

    function openModel() {
        setCurrentOpenStateModel('modal');
    }

    function closeModel() {
        setCurrentCloseStateModel('closeModal');
    }

    function clearCloseModel() {
        setCurrentCloseStateModel('modal');
    }

    function openOTP() {
        setCurrentOpenStateModel('OTP');
    }

    function closeOTP() {
        setCurrentCloseStateModel('closeOTP');
    }

    function openModelChangePass() {
        setCurrentOpenStateModel('modelChangePass');
    }

    function closeModelChangePass() {
        setCurrentCloseStateModel('closeModelChangePass');
    }

    const ctxtValue = {
        currentOpenModel: currentOpenStateModel,
        currentCloseModel: currentCloseStateModel,
        openModel,
        closeModel,
        openOTP,
        closeOTP,
        openModelChangePass,
        closeModelChangePass,
        clearCloseModel,
    };

    return (
        <ModelContext.Provider value={ctxtValue}>
            {children}
        </ModelContext.Provider>
    );
}

export default ModelContext;