import React from "react";
import Expect from "chai";
import { shallow, mount } from "enzyme";

import App from "./app";

describe("<App />", () => {
	it("Renders without crashing", () => {
		shallow(<App />);
	});
});
