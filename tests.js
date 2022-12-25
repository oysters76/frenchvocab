function test_constructWordAndOptions(level, options){
  t = constructWordAndOptions(level, options)
  console.log(t)
  condition1 = ((typeof t[0]) == "number")
  assert(condition1, "constructWordAndOptions must return a number as first output")
  condition2 = ((typeof t[1]) == "object");
  assert(condition2, "constructWordAndOptions must return a object/array as second output");
  condition3 = true;
  condition4 = true;
  t[1].forEach((item, i) => {
    condition3 = item < (level * 10);
    condition4 = item != t[0]
    if (!condition3){
      assert(condition3, "constructWordAndOptions array options items must be lesser than level*10");
    }
    if (!condition4){
      assert(condition4, "constructWordAndOptions array options items must not equal first return val");
    }
  });
  console.log("test_constructWordAndOptions complete");
}

function runAllTests(){
  test_constructWordAndOptions(1, [0,2,3]);
  test_constructWordAndOptions(2, [0,2,3]);
  test_constructWordAndOptions(3, [0,2,3]);
  test_constructWordAndOptions(4, [0,2,3]);
  test_constructWordAndOptions(40, [20,30,23, 25, 15]);
}

function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}
