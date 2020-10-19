import { describe, it } from "mocha";
import assert from "power-assert";


describe("Testing", function(){
	it("Mocha is integrated", function()
	{
		assert(true);
	});
	it("Power Assert works", function()
	{
        const foo = "abc";
        const bar = 123;

        try
        {
            assert(foo === bar);
        }
        catch(e)
        {
            assert(/"abc"/.test(e));

            console.log("DEMO ERROR:", e);

            return
        }
		assert(false);
	});
});
