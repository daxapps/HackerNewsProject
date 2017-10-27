import React from "react";
import Expect from "chai";
import { shallow, mount } from "enzyme";

import Story from "./story";

describe("<Story />", () => {
	it("Renders without crashing", () => {
		shallow(<Story />);
	});
});
