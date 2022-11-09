import { BigInt, Bytes } from '@graphprotocol/graph-ts'
import { ZERO_ADDRESS, integer } from '@protofire/subgraph-toolkit'
import { Account } from '../../generated/schema'
import { lens } from './lens'
import { profiles } from '../modules'

export namespace accounts {
  export function getOrCreateAccount(accountAddress: Bytes): Account {
    let accountId = accountAddress.toHexString()

    let account = Account.load(accountId)
    if (account == null) {
      account = new Account(accountId)
      account.address = accountAddress
      account.save()

      // +1 amount of lens profiles
      let lensInfo = lens.getOrCreateLensInfo()
      lensInfo.totalAccounts = lensInfo.totalAccounts.plus(integer.ONE)
      lensInfo.save()
    }
    return account as Account
  }

}
