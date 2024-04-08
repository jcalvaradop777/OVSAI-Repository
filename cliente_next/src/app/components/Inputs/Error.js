import { useState } from "react";

// Este componente ha sido creado para avisar de errores captados en el valor o entrada del input
// Ejemplo: Solo se permiten números
// Si se ingresa una letra: incorrecto - caso contrario: correcto
// Y nos muestra un mensaje, que podemos personalizar

/*
Los tipos de condiciones son: 
 - EMPTY: Significa que el campo está vacio
*/

export default function InputError({
  label,
  textLabel,
  type,
  errorCondition,
  message,
  _setData,
  _data,
  Change,
  ...props
}) {
  const [_props] = useState({
    label: label ? label : "test1",
    textLabel: textLabel ? textLabel : "Input 1",
    type: type ? type : "text",
    errorCondition: "EMPTY",
    message: message ? message : "El campo está vacio",
  });

  const [error, setError] = useState(null);
  const [status, setStatus] = useState(false);

  const checkData = (e) => {
    if (e.target.value.trim().length === 0) {
      setStatus(false);
      setError(
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">Error</span> {_props.message}
        </div>
      );
      _setData({
        ..._data,
        [label]: status,
      });
    } else {
      setError(null);
      setStatus(true);
      _setData({
        ..._data,
        [label]: status,
      });
    }

    Change(e);
  };

  return (
    <label htmlFor={label}>
      <span className="block mb-2 text-sm font-medium text-gray-900">
        {textLabel}
      </span>
      <input
        type={_props.type}
        id={_props.label}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-0"
        onChange={checkData}
        {...props}
      />
      {error ? error : <></>}
    </label>
  );
}
