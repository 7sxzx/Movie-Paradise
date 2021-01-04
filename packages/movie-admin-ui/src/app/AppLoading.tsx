import React from 'react'

const AppLoading = () => {
  const MenuLogo = () => <span className="block w-32 h-10 mb-2 loading" />

  const MenuItem = () => <span className="block w-24 h-10 m-2 loading" />

  const AppHeader = () => <span className="block w-full h-12 loading" />

  const PageTitle = () => <span className="block w-48 h-8 my-4 loading" />

  const PageContent = () => <div className="w-full h-screen loading" />

  return (
    <div className="flex w-full pt-4" style={{ backgroundColor: '#1f1f1f' }}>
      <aside className="flex flex-col items-center w-48">
        <MenuLogo />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </aside>

      <main className="w-full px-8">
        <AppHeader />
        <PageTitle />
        <PageContent />
      </main>
    </div>
  )
}

export default AppLoading
