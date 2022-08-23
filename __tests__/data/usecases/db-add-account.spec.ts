import { DbAddAccount } from '../../../src/data/usecases/db-add-account'
import { AddAccountSpy } from '../../presentation/mocks/add-account-mock'
import { fakeAccount } from '../mocks'
import { HasherSpy } from '../mocks/hasher-mock'

const makeSut = () => {
  const addRepo = new AddAccountSpy()
  const hasher = new HasherSpy()
  const sut = new DbAddAccount(addRepo, hasher)
  return { sut, hasher, addRepo }
}

describe('Add Account Use Case', () => {
  it('should call addRepo with correct params', async () => {
    const { sut, addRepo } = makeSut()
    const addRepoSpy = jest.spyOn(addRepo, 'add')

    await sut.add({ email: fakeAccount!.email, password: fakeAccount!.password, name: fakeAccount!.name })
    expect(addRepoSpy).toBeCalledWith({ email: fakeAccount!.email, password: 'hashed', name: fakeAccount!.name })
  })
  it('should throw if addRepo throws', async () => {
    const { sut, addRepo } = makeSut()
    jest.spyOn(addRepo, 'add').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    const promise = sut.add({ email: fakeAccount!.email, password: fakeAccount!.password, name: fakeAccount!.name })
    expect(promise).rejects.toThrow()
  })
  it('should call hasher with correct params', async () => {
    const { sut, hasher } = makeSut()
    const hasherSpy = jest.spyOn(hasher, 'hash')

    await sut.add({ email: fakeAccount!.email, password: fakeAccount!.password, name: fakeAccount!.name })
    expect(hasherSpy).toBeCalledWith(fakeAccount!.password)
  })
  it('should throw if hasher throws', async () => {
    const { sut, hasher } = makeSut()
    jest.spyOn(hasher, 'hash').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    const promise = sut.add({ email: fakeAccount!.email, password: fakeAccount!.password, name: fakeAccount!.name })
    expect(promise).rejects.toThrow()
  })
  it('should return an hashed text when use case success', async () => {
    const { sut } = makeSut()
    const res = await sut.add({ email: fakeAccount!.email, password: fakeAccount!.password, name: fakeAccount!.name })
    expect(res).toBe(true)
  })
})
