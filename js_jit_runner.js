#!/usr/bin/env node

/**
 * @file js_jit_runner.js
 *
 * @breif Very simple JIT runner for JavaScript language with support for only
 * binary/unary arithmetic operations with integers.
 */
var jit = require('jit.js'),
    esprima = require('esprima'),
    assert = require('assert');

console.log('# input: ' + process.argv[2]);

var ast = esprima.parse(process.argv[2]);

// Compile
var fn = jit.compile(function() {
    // This will generate default entry boilerplate
    this.Proc(function() {
        visit.call(this, ast);
        // The result should be in 'rax' at this point
        //
        // This will genrate default exit boilerplate
        this.Return();
    });
});

console.log(fn());

function visit(ast) {
    if (ast.type === 'Program')
        visitProgram.call(this, ast);
    else if (ast.type === 'Literal')
        visitLiteral.call(this, ast);
    else if (ast.type === 'UnaryExpression')
        visitUnary.call(this, ast);
    else if (ast.type === 'BinaryExpression')
        visitBinary.call(this, ast);
    else
        throw new Error('Unknown ast node: ' + ast.type);
}

function visitProgram(ast) {
    assert.equal(ast.body.length, 1,
        'Only one statement programs are supported');
    assert.equal(ast.body[0].type, 'ExpressionStatement');
    visit.call(this, ast.body[0].expression);
}

function visitLiteral(ast) {
    assert.equal(typeof ast.value, 'number');
    assert.equal(ast.value | 0, ast.value,
        'Only integer numbers are supported');
    this.mov('rax', ast.value);
}

function visitUnary(ast) {
    // Visit argument and put result into 'rax'
    visit.call(this, ast.argument);
    if (ast.operator === '-') {
        // Negate the result
        this.neg('rax');
    } else {
        throw new Error('Unsupported unary operator: ' + ast.operator);
    }
}

function visitBinary(ast) {
    // Preserve 'rbx' after leaving the AST node
    this.push('rbx');
    // Visit right side of the expression
    visit.call(this, ast.right);
    // Move the result store in 'rax' to 'rbx'
    this.mov('rbx', 'rax');
    // Visit left side of expression
    visit.call(this, ast.left);
    // To conclude, now we have left side in 'rax' and right side in 'rbx'
    //
    // Time to execute the binary operation
    if (ast.operator === '+') {
        this.add('rax', 'rbx');
    } else if (ast.operator === '-') {
        this.sub('rax', 'rbx');
    } else if (ast.operator === '*') {
        // Signed multiplication
        this.imul('rbx');
    } else if (ast.operator === '/') {
        // Preserve 'rdx'
        this.push('rdx');
        // idiv is dividing rdx:rax by rbx, therefore we need to clear rdx
        // before running it
        this.xor('rdx', 'rdx');
        // Signed division, idiv puts remainder in rbx, and quotients in rax
        this.idiv('rbx');
        // Restore rdx
        this.pop('rdx');
    } else if (ast.operator === '%') {
        this.push('rdx');
        this.xor('rdx', 'rdx');
        this.idiv('rbx');
        // idiv puts remainder in rbx
        this.mov('rax', 'rbx');
        this.pop('rdx');
    } else {
        throw new Error('Unsupported binary operator: ' + ast.operator);
    }
    // Restore 'rbx'
    this.pop('rbx');
}
