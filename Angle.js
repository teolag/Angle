"use strict";


class Angle {

	constructor(r) {
		this.r = r || 0;
	}

	set(r) {
		this.r = r;
		return this;
	}

	get() {
		return this.r;
	}

	rotate(r) {
		return new Angle(this.r + r);
	}

	toString() {
		return this.r + ", " + this.getDeg() + ", " + this.getDirection();
	}

	getDeg() {
		return 180*this.r/Math.PI;
	}

	setDeg(deg) {
		this.r = Math.PI*deg/180;
		return this;
	}

	getDirection() {
		var deg = this.getDeg() % 360;
		if(deg<0) deg+=360;
		return "NW";
	}

	diff(other) {
		return new Angle(other.r - this.r);
	}

	dirDiff(other) {
		var r1 = this.r % (2*Math.PI);
		var r2 = other.r % (2*Math.PI);
		var diff = r2-r1;
		if(diff>Math.PI) diff = diff-2*Math.PI;
		if(diff<-Math.PI) diff = diff+2*Math.PI;

		return new Angle(diff);
	}

	interpolate(other, percent) {
		return new Angle(this.r + percent*(this.diff(other).r));
	}

	interpolateDirection(other, percent) {
		return new Angle(this.r + percent*(this.dirDiff(other).r));
	}

	getRevolutions() {
		return this.r/(2*Math.PI);
	}

	setRevolutions(rev) {
		this.r = rev*2*Math.PI;
		return this;
	}
}