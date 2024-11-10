import { useState } from "react";
import ProfileCreationForm from "./forms/profile";

function Onboarding() {
	const [level, setLevel] = useState<number>(0);

	return <>{level === 0 && <ProfileCreationForm />}</>;
}

export default Onboarding;
