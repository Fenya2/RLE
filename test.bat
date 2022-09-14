@echo off
for /l %%i in (1,1,%1) do (
echo %%i
node textCreator.js Executions\input_%%i.txt
node script.js input.txt \e rle.txt
node script.js rle.txt \d output.txt
comp input.txt output.txt /M > Executions\result_%%i.txt
)
