# Documentation for the Code in the Selection

## Description
[Add a brief description of what the code in the selection does]

## Usage
[Add instructions on how to use the code in the selection]

## Inputs
[Add a list of inputs that the code in the selection requires]

## Outputs
[Add a list of outputs that the code in the selection produces]

## Code Example
[Add a code example that demonstrates how to use the code in the selection]

## Notes

## PROBLEM:
    The algorithm having to go through too many points.
## Complications:
    We have to keep it one path so that the eraser works properly.
## Solution:
    Having a placeholder array that stores 2-300 values in it. ->
    when value exeedes that number, add it to the path and then clear it ->
    start adding new values and smoothing them again.
## SUDO
    tempLine = sharedValue = [];
    reRenderCurrentLine = {

        if(tempLine.value.length > 200)
        {
            pathstring.value =+ templine.value;
            setAllPathsState(pathString.value);
            templine.value = [];
        }
    }

    So currentStrokeLine + tempLineString when being displayed
    them if length exeeds 200, pathstring gets added to templine and templine is cleared.

    Instead of pathString being totally recalculated every update, it is calculated in chunks which are saved.