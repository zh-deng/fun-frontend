import { useEffect, useState } from "react";

export const Hello = () => {
	const [message, setMessage] = useState<string>("");

	useEffect(() => {
		fetch("http://localhost:8080/api/heyho")
			.then((response) => response.text())
			.then((data) => setMessage(data))
			.catch((error) => console.log("Error fetching data:", error));
	}, []);

	return (<div>
    <h1>Backend says:</h1>
    <p>
      {message || "Loading..."}
    </p>
  </div>);
};
