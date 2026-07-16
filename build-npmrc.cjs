#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const authToken = process.env.NYCO_COMPONENT_LIBRARY_NPM_AUTH_TOKEN;

if (!authToken) {
  console.error('ERROR: NYCO_COMPONENT_LIBRARY_NPM_AUTH_TOKEN is not set.');
  process.exit(1);
}

const content = `
@nycopportunity:registry=https://pkgs.dev.azure.com/doitt-compute-services/nyco-products/_packaging/nycopportunity/npm/registry/
always-auth=true
; begin auth token
//pkgs.dev.azure.com/doitt-compute-services/nyco-products/_packaging/nycopportunity/npm/registry/:username=doitt-compute-services
//pkgs.dev.azure.com/doitt-compute-services/nyco-products/_packaging/nycopportunity/npm/registry/:_password=${authToken}
//pkgs.dev.azure.com/doitt-compute-services/nyco-products/_packaging/nycopportunity/npm/registry/:email=npm requires email to be set but doesn't use the value
//pkgs.dev.azure.com/doitt-compute-services/nyco-products/_packaging/nycopportunity/npm/:username=doitt-compute-services
//pkgs.dev.azure.com/doitt-compute-services/nyco-products/_packaging/nycopportunity/npm/:_password=${authToken}
//pkgs.dev.azure.com/doitt-compute-services/nyco-products/_packaging/nycopportunity/npm/:email=npm requires email to be set but doesn't use the value
; end auth token
`;

fs.writeFileSync(path.join(process.cwd(), '.npmrc'), content, { flag: 'w' });
console.log('.npmrc written successfully.');
