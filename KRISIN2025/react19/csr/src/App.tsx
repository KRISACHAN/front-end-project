import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ActionsIndex from './pages/actions';
import UseActionStateDemo from './pages/actions/useActionState';
import UseFormStatusDemo from './pages/actions/useFormStatus';
import UseTransitionDemo from './pages/actions/useTransition';

import UseOptimisticIndex from './pages/useOptimistic';
import UseOptimisticDemo from './pages/useOptimistic/useOptimistic';

import UseIndex from './pages/use';
import UseDemo from './pages/use/use';

import RefIndex from './pages/ref';
import RefDemo from './pages/ref/ref';

function App() {
    return (
        <BrowserRouter>
            <div style={{ padding: '20px' }}>
                <nav>
                    <ul>
                        <li>
                            <Link to="/actions">Actions Demos</Link>
                            <ul>
                                <li>
                                    <Link to="/actions/useTransition">
                                        useTransition Demo
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/actions/useActionState">
                                        useActionState Demo
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/actions/UseFormStatusDemo">
                                        UseFormStatusDemo Demo
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/useOptimistic">useOptimistic Demo</Link>
                            <ul>
                                <li>
                                    <Link to="/useOptimistic/useOptimistic">
                                        useOptimistic Demo
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/use">use Demo</Link>
                            <ul>
                                <li>
                                    <Link to="/use/use">use Demo</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/ref">ref Demo</Link>
                            <ul>
                                <li>
                                    <Link to="/ref/ref">ref Demo</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>

                <hr />

                <Routes>
                    <Route path="/actions" element={<ActionsIndex />} />
                    <Route
                        path="/actions/useTransition"
                        element={<UseTransitionDemo />}
                    />
                    <Route
                        path="/actions/useActionState"
                        element={<UseActionStateDemo />}
                    />
                    <Route
                        path="/actions/useFormStatusDemo"
                        element={<UseFormStatusDemo />}
                    />
                    <Route
                        path="/useOptimistic"
                        element={<UseOptimisticIndex />}
                    />
                    <Route
                        path="/useOptimistic/useOptimistic"
                        element={<UseOptimisticDemo />}
                    />
                    <Route path="/use" element={<UseIndex />} />
                    <Route path="/use/use" element={<UseDemo />} />
                    <Route path="/ref" element={<RefIndex />} />
                    <Route path="/ref/ref" element={<RefDemo />} />
                    <Route
                        path="/"
                        element={<h1>Welcome to React 19 Features Demo</h1>}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
