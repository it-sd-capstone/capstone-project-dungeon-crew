/**
 * @jest-environment jsdom
 */

import { expect,jest,test } from '@jest/globals';
import $ from 'jquery';

// test jQuery select
test('use jQuery to select elements',()=>{
    document.body.innerHTML =
        "<h1>Header</h1>" +
        "<p>Paragraph</p>" +
        "<p id=\"test-para\">Test Para</p>";

    expect($("h1").text()).toBe("Header");
    expect($("p:first").text()).toBe("Paragraph");
    expect($("#test-para").text()).toBe("Test Para");
});

test('use jQuery to manipulate elements',()=>{
    document.body.innerHTML =
        "<h1>Header</h1>";

    const header = $("h1");

    expect(header.text()).toBe("Header");

    header.text("Heading");

    expect(header.text()).toBe("Heading");
});