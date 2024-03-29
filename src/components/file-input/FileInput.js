import { useCallback, useState } from "react";

export default function FileInput({
  id,
  placeholder = "Click to select file...",
  onReady,
}) {
  const [name, setName] = useState("");
  const onChange = useCallback(
    (event) => {
      const [file] = event.target.files;
      if (file) {
        const reader = new FileReader();
        reader.onload = function () {
          onReady(reader.result, file.name);
        };
        reader.readAsText(file, "utf-8");
        setName(file.name);
      }
    },
    [onReady, setName]
  );
  return (
    <div>
      <label htmlFor={id} className="button">
        {name || placeholder}
      </label>
      <input
        id={id}
        type="file"
        accept="text/plain"
        onChange={onChange}
        hidden
      />
    </div>
  );
}
