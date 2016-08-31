// ------------------------------------------------------------------------------
//  Copyright (c) 2009-2013 the original author or authors. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, named } from "inversify";

@injectable()
export class ClassReportingCallbackHook {

    protected _reportingFunc: Function;

    constructor(
        @inject("Function") @named("reportingFunc") reportingFunc: Function
    ) {
        this._reportingFunc = reportingFunc;
    }

    public hook(): void {
        if (this._reportingFunc) {
            this._reportingFunc(ClassReportingCallbackHook);
        }
    }
}