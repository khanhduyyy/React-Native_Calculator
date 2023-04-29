export const initialState = {
  currentValue: "0",
  operator: null,
  flag:0,
  previousValue: null
};

export const handleNumber = (value, state) => {
  if (state.currentValue === "0" || state.flag===1) {
    return { currentValue: `${value}`, flag:0 };
  }

  return {
    currentValue: `${state.currentValue}${value}`
  };
};

export const handleOperator = state => {
  const { currentValue, previousValue, operator } = state;

  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue);

  if (operator === "/") {
    return {
      currentValue: previous / current,
      previousValue: previous / current,
      operator:"/",
      flag:1 
    };
  }
  
  if (operator === "*") {
    return {
      currentValue: previous * current,
      previousValue: previous * current,
      operator:"*",
      flag:1
    };
  }

  if (operator === "+") {
    return {
      currentValue: previous + current,
      previousValue: previous + current,
      operator:"+",
      flag:1
    };
  }

  if (operator === "-") {
    return {
      currentValue: previous - current,
      previousValue: previous - current,
      operator:"-",
      flag:1
    };
  }

  return state;
};

export const handleEqual = state => {
  const { currentValue, previousValue, operator } = state;

  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue);
  const resetState = {
    operator: null,
    previousValue: null
  };

  if (operator === "/") {
    return {
      currentValue: previous / current,
      ...resetState
    };
  }

  if (operator === "*") {
    return {
      currentValue: previous * current,
      ...resetState
    };
  }

  if (operator === "+") {
    return {
      currentValue: previous + current,
      ...resetState
    };
  }

  if (operator === "-") {
    return {
      currentValue: previous - current,
      ...resetState
    };
  }

  return state;
};

const calculator = (type, value, state) => {
  switch (type) {
    case "number":
      return handleNumber(value, state);
    case "operator":
      console.log(state.operator);
      if(state.previousValue!=null)
      {
        return{ 
          ...handleOperator(state),operator:value
        }
      }
      return {
        operator: value,
        previousValue: state.currentValue,
        flag: 1,
        currentValue: state.currentValue
      };
    case "equal":
      console.log(state.operator);
      return handleEqual(state);
    case "clear":
      return initialState;
    case "posneg":
      return {
        currentValue: `${parseFloat(state.currentValue) * -1}`
      };
    case "percentage":
      return {
        currentValue: `${parseFloat(state.currentValue) * 0.01}`
      };
    default:
      return state;
  }
};

export default calculator;
