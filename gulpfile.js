/**
 * @file Gulp configuration for n8n-nodes-synctera
 * @copyright 2025 Velocity BPA
 * @license BSL-1.1
 */

const { src, dest, series } = require('gulp');
const path = require('path');

/**
 * Copy node icons to dist directory
 */
function buildIcons() {
	return src(['nodes/**/*.svg', 'nodes/**/*.png'])
		.pipe(dest('dist/nodes'));
}

/**
 * Copy credential icons to dist directory (if any)
 */
function buildCredentialIcons() {
	return src(['credentials/**/*.svg', 'credentials/**/*.png'])
		.pipe(dest('dist/credentials'));
}

/**
 * Copy any additional assets
 */
function copyAssets() {
	return src(['nodes/**/*.json'])
		.pipe(dest('dist/nodes'));
}

exports['build:icons'] = series(buildIcons, buildCredentialIcons, copyAssets);
exports.default = exports['build:icons'];
