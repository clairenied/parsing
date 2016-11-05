describe("calculator", function() {

  /* These tests work on specific parsing rules */
  it("has a number() function that converts a string expressionToParse to a number", function() {
    var calc = new Calculator("123");
    expect(calc.number()).toEqual(123);
  });

  it("has a number() function that converts a string expressionToParse to a number", function() {
    var calc = new Calculator("123.321");
    expect(calc.number()).toEqual(123.321);
  });

  it("has a factor() function that can handle negative numbers", function() {
    var calc = new Calculator("-123.15");
    expect(calc.number()).toEqual(0); // this is not a typo - try to figure out why it's 0
    expect(calc.factor()).toEqual(-123.15);
  });

  it("has a factor() function that can handle parentheses around expressions", function() {
    var calc = new Calculator("(123)");
    // factor has a rule that consumes the left and right paren an expr inside
    // this means you aren't using the real expression function but a fake one
    // that always returns 123
    spyOn(calc, 'expression').andCallFake(function() {
      // expression() would have removed the 123 and left you with the right paren
      calc.expressionToParse.shift();
      calc.expressionToParse.shift();
      calc.expressionToParse.shift();
      return 123;     
    });

    expect(calc.factor()).toEqual(123);
    expect(calc.expressionToParse).toEqual([]); // did you parse all the symbols?
  });


  /* These tests start from run and go through expression() */
  it("can parse a a single digit number", function() {
    expect((new Calculator("4")).run()).toEqual(4);
  })

  it("can parse a number without a decimal", function() {
    expect((new Calculator("428")).run()).toEqual(428);
  })

  it("can parse a number with a decimal", function() {
    expect((new Calculator("428.27")).run()).toEqual(428.27);
  })

  it("handles negative numbers", function() {
    expect((new Calculator("-3")).run()).toEqual(-3);
  });

  it("can handle addition of two numbers", function() {
    expect((new Calculator("1+2")).run()).toEqual(3);
  });

  it("can handle subtraction of two numbers", function() {
    expect((new Calculator("4-2")).run()).toEqual(2);
  });

  it("handles any number of addition and subtraction statements", function() {
    expect((new Calculator("4+2+1-2+2")).run()).toEqual(7);
  });

  it("handles multiplication statements", function() {
    expect((new Calculator("2*3")).run()).toEqual(6);
  })

  it("handles division statements", function() {
    expect((new Calculator("8/2")).run()).toEqual(4);
  })

  it("handles any number of multiplication statements", function() {
    expect((new Calculator("5*3*4*8*2")).run()).toEqual(960);
  })

  it("handles any number of division statements", function() {
    expect((new Calculator("100/2/5/5")).run()).toEqual(2);
  })

  it("handles a math expression with parentheses", function() {
    // debugger;
    expect((new Calculator("(5-3*4)")).run()).toEqual(-7);
  })

  it("handles more complicated mathmatical expressions", function() {
    expect((new Calculator("(5 - -(3 + (2 * 2 / 2) *(4 / 2)))")).run()).toEqual(12);
  })
});
