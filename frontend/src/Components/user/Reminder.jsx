import React from 'react'

const Reminder = () => {
  return (
    <div>
        <h1>set your reminder</h1>
        <form action="">
            <label htmlFor="">Email: <input type="email" name="" id="" /></label><br/>
            <label>
        Drug Name:
        <input type="text" name="drugName"  required />
      </label>
      
      <fieldset>
        <legend>Recurring Days</legend>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
          <label key={day}>
            <input type="checkbox" name="days" value={day}  />
            {day}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Times</legend>
        {['Morning', 'Afternoon', 'Evening', 'Night'].map((time) => (
          <label key={time}>
            <input type="checkbox" name="times" value={time}  />
            {time}
          </label>
        ))}
      </fieldset>
      <button type="submit">Set Reminder</button>
        </form>
    </div>
  )
}

export default Reminder