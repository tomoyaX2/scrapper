# Model File

Model files are usually gonna fit inside one file. When deciding on how to organise model consider this recommendations:

First of all order of things inside of model file should be

events - createEvent calls and variables
effects - createEffect calls with type definitions but without default handlers
stores - store definitions with default states
samples (samples which will return event and used later should be defined before samples w/o putting even in variable)
on - store handlers bindings
use - effects handlers implementations
functions - utility function declarations ( you can also swap and define them on top via anon arrow functions but declarations first look more reasonable )

If model file starts to be too big, you should consider splitting it into a few model files by separating specific logic groups.

if model cant be splitted (which's unlikely) but it's starting to be REALLY big you can make separate folder for it and split things by their type:

modelname/

- events
- effects ( with implementations in the same file )
- stores
- bindings ( samples )
- lib

Naming conventions for model related things

- events should be called in past time preferably ( until there are some specific cases when you really need even functionality but it will serve to manually trigger some logic and even just easier to use since you can bind it to other units ) - somethingHappened, saveClicked
- effect names should end with "Fx" - getSomethingFx, saveUserFx
- stores should be prefixed with $ sign - $someName
