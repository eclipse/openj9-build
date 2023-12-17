/*******************************************************************************
 * Copyright (c) 2020, 2020 IBM Corp. and others
 *
 * This program and the accompanying materials are made available under
 * the terms of the Eclipse Public License 2.0 which accompanies this
 * distribution and is available at https://www.eclipse.org/legal/epl-2.0/
 * or the Apache License, Version 2.0 which accompanies this distribution and
 * is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 * This Source Code may also be made available under the following
 * Secondary Licenses when the conditions for such availability set
 * forth in the Eclipse Public License, v. 2.0 are satisfied: GNU
 * General Public License, version 2 with the GNU Classpath
 * Exception [1] and GNU General Public License, version 2 with the
 * OpenJDK Assembly Exception [2].
 *
 * [1] https://www.gnu.org/software/classpath/license.html
 * [2] http://openjdk.java.net/legal/assembly-exception.html
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0 OR GPL-2.0-only WITH OpenJDK-assembly-exception-1.0
 *******************************************************************************/
import * as core from '@actions/core'
import * as builder from './builder'

async function run(): Promise<void> {
  try {
    const version = core.getInput('version', {required: false})
    const usePersonalRepo = core.getInput('usePersonalRepo') === 'true'
    let specifiedReposMap = new Map()
    if (usePersonalRepo) {
      const repos: string[] = ['openj9Repo', 'openj9-omrRepo', 'openj9-openjdkRepo']
      for (let repo of repos) {
        const tempRepo = core.getInput(repo, { required: false })
        if (tempRepo.length !== 0) {
          specifiedReposMap.set(repo, tempRepo)
        }
      }
    }
    await builder.buildJDK(version, usePersonalRepo, specifiedReposMap)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
