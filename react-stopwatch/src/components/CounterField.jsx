import { COUNTER_INPUTS_DATA } from "../counter.constant";

const CounterField = ({onChange, timerValue}) => {
    return  (
        <div className="counter-inputs-container">
            {COUNTER_INPUTS_DATA.map((unit) => (
                <div key={unit}>
                    <input type='text' placeholder={unit.charAt(0)} onChange={(e) => onChange(e.target.value, unit)} value={`${timerValue[unit]}`.padStart(2, '0')} name={unit}/>
                </div>
            ))}
        </div>
    )
}

export default CounterField;