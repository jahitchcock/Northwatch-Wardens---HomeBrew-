Run the Northwatch Wardens guide build system.

If the user specified `--players` or `--dms`, pass that flag. Otherwise build both guides.

Steps:
1. Run `./build.sh $ARGUMENTS` from the repository root and capture output.
2. Report which output files were produced in `build/` and their sizes.
3. If the build fails, show the relevant error lines and diagnose the root cause (missing file in TOC JSON, broken markdown syntax, missing npm dependency, etc.).
4. If warnings appear about missing files, identify which TOC JSON entry is broken and offer to fix it.

Do not open or display the full HTML output — just confirm the files exist and report success or failure.
