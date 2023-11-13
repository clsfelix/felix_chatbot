import { Button, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import "./prompt.scss";
import SendIcon from '@mui/icons-material/Send';
import React, { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { nextAnswer } from "../../store/features/chatSlicer";
import queueService from "../../services/queueService";
import { brazilianStates } from "../../constants/BrazilianStates";
import { IMaskInput } from "react-imask";

export default function Prompt() {

    const [value, setValue] = useState('');

    const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const handleBirthDay = (event: any) => {
        if (event.length === 10) {
            setValue(event);
        } else {
            setValue('');
        }
    }
    const { chatState, dispatch } = useContext(ChatContext);
    const { currentAnswer, blockPrompt } = chatState;

    const onKeyDown = (event:any,fn:CallableFunction) => {
        if(event.key == 'Enter') {
            fn();
        }
    }

    const submitAnswer = () => {
        queueService.addAnswer(currentAnswer, value)
        dispatch(nextAnswer());
        setValue('');

    }

    const submitSelect = (event: SelectChangeEvent<string>) => {
        queueService.addAnswer(currentAnswer, event.target.value);
        dispatch(nextAnswer());
    }

    if (currentAnswer === 'state') {
        return (
            <>
                <div className="prompt">
                    <Select fullWidth className="promptInput" size="small" value={value} onChange={submitSelect} disabled={blockPrompt}>
                        {Object.keys(brazilianStates).map((key: string) => {
                            return (
                                <MenuItem value={key} key={`item-${key}`}>{brazilianStates[key]}</MenuItem>
                            )
                        })}
                    </Select>
                </div>
            </>
        )

    }

    if (currentAnswer === 'birthday') {
        interface CustomProps {
            onChange: (event: { target: { name: string; value: string } }) => void;
            name: string;
        }

        const BirthDayMaskInput = React.forwardRef<HTMLInputElement, CustomProps>(
            function BirthDayMaskInput(props, ref) {
                const { onChange, ...other } = props;
                return (
                    <IMaskInput
                        {...other}
                        mask="00/00/0000"
                        inputRef={ref}
                        onAccept={(event: any) => handleBirthDay(event)}
                        overwrite
                    />
                )

            }
        )

        return (
            <>

                <div className="prompt">

                    <TextField placeholder="00/00/0000" fullWidth InputProps={{inputComponent:BirthDayMaskInput as any}} size="small"
                        onChange={handleBirthDay} value={value} name="inputBirthDay" onKeyDown={(e) => onKeyDown(e,submitAnswer)}
                        disabled={blockPrompt}
                    />
                    <Button variant="text" className="sendIcon" onClick={submitAnswer}>
                        <SendIcon sx={{ fontSize: '32px' }} color="primary" />
                    </Button>
                </div>
            </>
        )
    }

    if(currentAnswer === 'rate') {
        return(<></>)
    }

    return (
        <>
            <div className="prompt">
                <TextField fullWidth className="promptInput" size="small" value={value} onChange={handleValue} type={currentAnswer == 'email' ? 'email' : 'text'}  onKeyDown={(e) => onKeyDown(e,submitAnswer)} autoComplete="off" inputProps={{"aria-autocomplete":'none'}} disabled={blockPrompt}/>
                <Button variant="text" className="sendIcon" onClick={submitAnswer}>
                        <SendIcon sx={{ fontSize: '32px' }} color="primary" />
                </Button>
            </div>
        </>
    )
}