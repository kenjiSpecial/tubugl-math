import { Euler } from './euler';
import { mat4 } from 'gl-matrix';

test('makeRotationFromEuler equals matrix.rotateX->rotateY->rotateZ', () => {
	var euler = new Euler(0.1, 0.2, 0.3);
	var mat = mat4.create();
	mat4.rotateX(mat, mat, euler.x);
	mat4.rotateY(mat, mat, euler.y);
	mat4.rotateZ(mat, mat, euler.z);

	var eulerMat = mat4.create();
	euler.toMatrix4(eulerMat);

	expect(mat).toEqual(eulerMat);
});

test('', () => {
	var euler = new Euler();
	var rotMat = new Float32Array([
		0.936293363571167,
		0.31299182772636414,
		-0.15934507548809052,
		0,
		-0.2896294891834259,
		0.9447025060653687,
		0.15379199385643005,
		0,
		0.19866932928562164,
		-0.09784339368343353,
		0.9751703143119812,
		0,
		0,
		0,
		0,
		1
	]);

	euler.setFromRotationMatrix(rotMat);
	expect(euler.x).toBeCloseTo(0.1);
	expect(euler.y).toBeCloseTo(0.2);
	expect(euler.z).toBeCloseTo(0.3);
});
